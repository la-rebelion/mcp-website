import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@site/src/components/ui/dialog';
import { useNativeFormSink } from '@site/src/lib/hubspot';
import { X, Mail, Zap, Code, MessageSquare, Bot } from 'lucide-react';

interface ExitIntentModalProps {
  open: boolean;
  onClose: () => void;
}

// @note: Native static <form> (no JS on submit) so the HubSpot tracking code collects it as a non-HubSpot form.
// See: https://knowledge.hubspot.com/forms/use-non-hubspot-forms

export const ExitIntentModal = ({ open, onClose }: ExitIntentModalProps) => {
  const { submitted, reset, formProps, sink } = useNativeFormSink();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
  };

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      reset();
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="mcpExit">
        <DialogHeader>
          <DialogTitle className="mcpExitTitle">Wait! Don't miss out on the AI revolution</DialogTitle>
          <DialogDescription className="mcpExitLead">Stay updated with the latest HAPI Stack developments and get exclusive insights</DialogDescription>
        </DialogHeader>

        <p className="mcpExitSub">Stay updated with the latest developments in the HAPI Stack for MCP. Get early access to new features, releases, and exclusive insights.</p>

        <div className="mcpExitFeatures">
          <div className="mcpExitFeature">
            <Code className="mcpExitIcon" />
            <div>
              <div className="mcpExitFeatureTitle">HAPI CLI</div>
              <div className="mcpExitFeatureSub">API to AI tools</div>
            </div>
          </div>
          <div className="mcpExitFeature">
            <Zap className="mcpExitIcon" />
            <div>
              <div className="mcpExitFeatureTitle">runMCP</div>
              <div className="mcpExitFeatureSub">Execute &amp; test</div>
            </div>
          </div>
          <div className="mcpExitFeature">
            <MessageSquare className="mcpExitIcon" />
            <div>
              <div className="mcpExitFeatureTitle">chatMCP</div>
              <div className="mcpExitFeatureSub">AI conversations</div>
            </div>
          </div>
          <div className="mcpExitFeature">
            <Bot className="mcpExitIcon" />
            <div>
              <div className="mcpExitFeatureTitle">HAPI Agents</div>
              <div className="mcpExitFeatureSub">Orchestration</div>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="mcpExitThanks">
            <Mail className="mcpExitThanksIcon" />
            <h3>Thank you for subscribing!</h3>
            <p>We'll keep you updated on the latest HAPI Stack developments.</p>
          </div>
        ) : (
          <form {...formProps} className="mcpExitForm">
            <input type="email" name="email" placeholder="Enter your email address" required className="mcpExitInput" />
            <div className="mcpExitActions">
              <input type="submit" value="Get Updates" className="mcpExitBtnPrimary" />
              <button type="button" className="mcpExitBtnGhost" onClick={onClose}>
                <X width={16} height={16} />
                <span>No Thanks</span>
              </button>
            </div>
          </form>
        )}

        <p className="mcpExitFooter">No spam, ever. Unsubscribe at any time. We respect your privacy.</p>
        {sink}
      </DialogContent>
    </Dialog>
  );
};
