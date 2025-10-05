import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@site/src/components/ui/dialog';
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const validate = (field?: string) => {
    const nextErrors: Record<string, string> = {...errors};
    const check = (name: string, valid: boolean, message: string) => {
      if (!valid) nextErrors[name] = message; else delete nextErrors[name];
    };
    const emailRe = /^(?:[^\s@]+@[^\s@]+\.[^\s@]+)$/;
    const phoneRe = /^[+()\d\s-]{7,}$/;
    if (!field || field === 'email') {
      const v = formData.email.trim();
      check('email', v.length > 0, 'Email is required.');
      if (v.length > 0) check('email', emailRe.test(v), 'Enter a valid email.');
    }
    if (!field || field === 'phone') {
      const v = formData.phone.trim();
      check('phone', v.length > 0, 'Phone is required.');
      if (v.length > 0) check('phone', phoneRe.test(v), 'Enter a valid phone number.');
    }
    if (!field || field === 'fullName') {
      const v = formData.fullName.trim();
      if (v.length > 0) check('fullName', v.length >= 2, 'Enter a full name (min 2 chars).');
    }
    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length > 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: 'Demo request submitted!',
        description: "We'll be in touch soon to schedule your demo.",
      });
      setIsSubmitting(false);
      onClose();
      setFormData({
        fullName: '',
        email: '',
        role: '',
        phone: '',
        company: '',
        painPoints: '',
        newsletter: false,
      });
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }, 1000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error on type
    if (errors[field]) {
      const ne = {...errors};
      delete ne[field];
      setErrors(ne);
    }
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

        <form onSubmit={handleSubmit} noValidate className="mcpExitForm">
          <div className="mcpFormGrid">
            <div>
              <label htmlFor="fullName" className="mcpLabel">Full Name</label>
              <input
                id="fullName"
                className={`mcpExitInput${errors.fullName ? ' is-invalid' : ''}`}
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                onBlur={() => validate('fullName')}
                placeholder="Your full name"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'err-fullName' : undefined}
              />
              {errors.fullName && <div id="err-fullName" className="mcpFieldError">{errors.fullName}</div>}
            </div>
            <div>
              <label htmlFor="email" className="mcpLabel">Email *</label>
              <input
                id="email"
                type="email"
                required
                className={`mcpExitInput${errors.email ? ' is-invalid' : ''}`}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => validate('email')}
                placeholder="your.email@company.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'err-email' : undefined}
              />
              {errors.email && <div id="err-email" className="mcpFieldError">{errors.email}</div>}
            </div>
          </div>

          <label htmlFor="role" className="mcpLabel">Role</label>
          <input id="role" className="mcpExitInput" value={formData.role} onChange={(e) => handleInputChange('role', e.target.value)} placeholder="e.g., Developer, CTO, Product Manager" />

          <div className="mcpFormGrid">
            <div>
              <label htmlFor="phone" className="mcpLabel">Phone *</label>
              <input
                id="phone"
                type="tel"
                required
                className={`mcpExitInput${errors.phone ? ' is-invalid' : ''}`}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onBlur={() => validate('phone')}
                placeholder="+1 (555) 123-4567"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'err-phone' : undefined}
              />
              {errors.phone && <div id="err-phone" className="mcpFieldError">{errors.phone}</div>}
            </div>
            <div>
              <label htmlFor="company" className="mcpLabel">Company</label>
              <input id="company" className="mcpExitInput" value={formData.company} onChange={(e) => handleInputChange('company', e.target.value)} placeholder="Your company name" />
            </div>
          </div>

          <label htmlFor="painPoints" className="mcpLabel">Main pain points with MCP</label>
          <textarea id="painPoints" className="mcpExitInput" style={{ minHeight: 80 }} value={formData.painPoints} onChange={(e) => handleInputChange('painPoints', e.target.value)} placeholder="Tell us about your current challenges with MCP..." />

          <label className="mcpLabel" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input id="newsletter" type="checkbox" checked={formData.newsletter} onChange={(e) => handleInputChange('newsletter', e.target.checked)} />
            <span>Subscribe to newsletter for updates on HAPI Stack</span>
          </label>

          <div className="mcpExitActions">
            <button type="button" className="mcpExitBtnGhost" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={isSubmitting} className="mcpExitBtnPrimary">{isSubmitting ? 'Submitting...' : 'Request Demo'}</button>
          </div>
        </form>

        <p className="mcpExitFooter">No spam, ever. Unsubscribe at any time. We respect your privacy.</p>
      </DialogContent>
    </Dialog>
  );
};
