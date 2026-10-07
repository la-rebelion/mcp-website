import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@site/src/components/ui/dialog';
import { useNativeFormSink } from '@site/src/lib/hubspot';
import { useToast } from '@site/src/hooks/use-toast';

interface DemoRequestModalProps {
  open: boolean;
  onClose: () => void;
}

export const DemoRequestModal = ({ open, onClose }: DemoRequestModalProps) => {
  const STORAGE_KEY = 'mcp.demoRequest.draft';
  const TTL_MS = 60 * 60 * 1000; // 60 minutes
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    phone: '',
    company: '',
    painPoints: '',
    newsletter: false,
  });
  const { submitted, reset, formProps, sink } = useNativeFormSink();
  const { toast } = useToast();

  // Load draft once on mount (with TTL)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const now = Date.now();
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          if (parsed.ts && parsed.data) {
            if (now - Number(parsed.ts) < TTL_MS) {
              setFormData((prev) => ({ ...prev, ...parsed.data }));
            } else {
              localStorage.removeItem(STORAGE_KEY);
            }
          } else {
            // Back-compat with legacy shape
            setFormData((prev) => ({ ...prev, ...parsed }));
          }
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist draft with a small debounce when fields change + schedule TTL cleanup
  const saveTimeoutRef = useRef<number | null>(null);
  const clearTimeoutRef = useRef<number | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = window.setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); } catch {}
      // Save with timestamp for TTL
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), data: formData })); } catch {}
      // Re-schedule cleanup timer
      if (clearTimeoutRef.current) window.clearTimeout(clearTimeoutRef.current);
      clearTimeoutRef.current = window.setTimeout(() => {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (!raw) return;
          const p = JSON.parse(raw);
          if (p && p.ts && Date.now() - Number(p.ts) >= TTL_MS) {
            localStorage.removeItem(STORAGE_KEY);
          }
        } catch {}
      }, TTL_MS);
    }, 250);
    return () => {
      if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
    };
  }, [formData]);

  // The form posts natively (HubSpot non-HubSpot form collection); the sink load signals completion.
  useEffect(() => {
    if (!submitted) return;
    toast({
      title: 'Demo request submitted!',
      description: "We'll be in touch soon to schedule your demo.",
    });
    onClose();
    setFormData({ fullName: '', email: '', role: '', phone: '', company: '', painPoints: '', newsletter: false });
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="mcpExit mcpDemo">
        <DialogHeader>
          <DialogTitle className="mcpExitTitle">Request a Demo</DialogTitle>
          <DialogDescription className="mcpExitLead">
            Tell us about your needs and we'll schedule a personalized demo
          </DialogDescription>
        </DialogHeader>

        <form {...formProps} className="mcpDemoRequest">
          <div className="mcpFormGrid">
            <div>
              <label htmlFor="fullName" className="mcpLabel">Full Name</label>
              <input
                id="fullName"
                name="firstname"
                className="mcpExitInput"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mcpLabel">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mcpExitInput"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@company.com"
              />
            </div>
          </div>

          <label htmlFor="role" className="mcpLabel">Role</label>
          <input id="role" name="jobtitle" className="mcpExitInput" value={formData.role} onChange={(e) => handleInputChange('role', e.target.value)} placeholder="e.g., Developer, CTO, Product Manager" />

          <div className="mcpFormGrid">
            <div>
              <label htmlFor="phone" className="mcpLabel">Phone *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mcpExitInput"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label htmlFor="company" className="mcpLabel">Company</label>
              <input id="company" name="company" className="mcpExitInput" value={formData.company} onChange={(e) => handleInputChange('company', e.target.value)} placeholder="Your company name" />
            </div>
          </div>

          <label htmlFor="painPoints" className="mcpLabel">Main pain points with MCP</label>
          <textarea id="painPoints" name="message" className="mcpExitInput" style={{ minHeight: 80 }} value={formData.painPoints} onChange={(e) => handleInputChange('painPoints', e.target.value)} placeholder="Tell us about your current challenges with MCP..." />

          <label className="mcpLabel" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input id="newsletter" name="newsletter" value="yes" type="checkbox" checked={formData.newsletter} onChange={(e) => handleInputChange('newsletter', e.target.checked)} />
            <span>Subscribe to newsletter for updates on HAPI Stack</span>
          </label>

          <div className="mcpExitActions">
            <button type="button" className="mcpExitBtnGhost" onClick={onClose}>Cancel</button>
            <input type="submit" value="Request Demo" className="mcpExitBtnPrimary" />
          </div>
        </form>

        <p className="mcpExitFooter">No spam, ever. Unsubscribe at any time. We respect your privacy.</p>
        {sink}
      </DialogContent>
    </Dialog>
  );
};
