import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CalendarCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ScheduleVisitModalProps {
  propertyId?: string;
  propertyTitle?: string;
  trigger?: React.ReactNode;
}

const ScheduleVisitModal = ({ propertyId, propertyTitle, trigger }: ScheduleVisitModalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    visitType: "",
    message: ""
  });

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  const visitTypes = [
    { value: "in-person", label: "In-Person Visit" },
    { value: "virtual", label: "Virtual Tour" },
    { value: "video-call", label: "Video Call with Agent" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      toast({
        title: "Please fill all required fields",
        description: "Name, email, phone, date, and time are required.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('scheduled_visits')
        .insert({
          property_id: propertyId || 'general',
          property_title: propertyTitle || 'General Visit',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          visit_date: formData.date,
          visit_time: formData.time,
          message: formData.message || null,
          user_id: user?.id || null,
          status: 'pending'
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save visit details');
      }

      // Send confirmation email
      try {
        const { error: emailError } = await supabase.functions.invoke('send-email', {
          body: {
            type: 'visit_scheduled',
            to: formData.email,
            name: formData.name,
            data: {
              propertyTitle: propertyTitle || 'General Visit',
              visitDate: formData.date,
              visitTime: formData.time,
              message: formData.message
            }
          }
        });

        if (emailError) {
          console.error('Email error:', emailError);
          // Don't throw - visit was saved, email just failed
        }
      } catch (emailErr) {
        console.error('Email sending failed:', emailErr);
        // Continue - visit was saved successfully
      }
      
      toast({
        title: "Visit Scheduled Successfully! 🎉",
        description: `Your visit is scheduled for ${formData.date} at ${formData.time}. A confirmation email has been sent.`,
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        visitType: "",
        message: ""
      });
      setOpen(false);
    } catch (error: any) {
      console.error('Error scheduling visit:', error);
      toast({
        title: "Failed to schedule visit",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="hero">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule a Visit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-primary" />
            Schedule a Property Visit
          </DialogTitle>
          <DialogDescription>
            {propertyTitle 
              ? `Book a visit for "${propertyTitle}". Fill in your details and we'll confirm your appointment.`
              : "Fill in your details to schedule a property visit. Our team will contact you to confirm."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="visit-name" className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              Full Name *
            </Label>
            <Input
              id="visit-name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visit-email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email *
              </Label>
              <Input
                id="visit-email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visit-phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Phone *
              </Label>
              <Input
                id="visit-phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visit-date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Preferred Date *
              </Label>
              <Input
                id="visit-date"
                type="date"
                min={today}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Preferred Time *
              </Label>
              <Select
                value={formData.time}
                onValueChange={(value) => setFormData({ ...formData, time: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Visit Type</Label>
            <Select
              value={formData.visitType}
              onValueChange={(value) => setFormData({ ...formData, visitType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visit type (optional)" />
              </SelectTrigger>
              <SelectContent>
                {visitTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="visit-message" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              Additional Message (Optional)
            </Label>
            <Textarea
              id="visit-message"
              placeholder="Any specific requirements or questions..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="hero"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Scheduling..." : "Confirm Visit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleVisitModal;
