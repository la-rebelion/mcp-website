import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@site/src/components/ui/dialog';
import { X, Mail, Zap, Code, MessageSquare, Bot } from 'lucide-react';

interface ExitIntentModalProps {
  open: boolean;
  onClose: () => void;
}

// @note: This form is structured as static HTML for HubSpot compliance
// We use inline preventDefault in the form element to avoid navigation while allowing HubSpot to track
// See: https://knowledge.hubspot.com/forms/use-non-hubspot-forms

export const ExitIntentModal = ({ open, onClose }: ExitIntentModalProps) => {
  const [showThankYou, setShowThankYou] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      onClose();
    }, 2000);
    return false;
  };

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

        {showThankYou ? (
          <div className="mcpExitThanks">
            <Mail className="mcpExitThanksIcon" />
            <h3>Thank you for subscribing!</h3>
            <p>We'll keep you updated on the latest HAPI Stack developments.</p>
          </div>
        ) : (
          <form method="POST" action="#" onSubmit={handleFormSubmit} className="mcpExitForm">
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
      </DialogContent>
    </Dialog>
  );
};
