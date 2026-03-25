"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";  
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function FeedbackDrawer({ children, triggerLabel = "Lascia un Feedback" }) {
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  
  const [formData, setFormData] = useState({
      nome: '',
      email: '',
      messaggio: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [serverMessage, setServerMessage] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!rating) {
          setStatus('error');
          setServerMessage("Per favore, seleziona una valutazione in stelle.");
          return;
      }
      if (!formData.nome || !formData.email || !formData.messaggio) {
          setStatus('error');
          setServerMessage("Per favore, compila tutti i campi.");
          return;
      }

      setStatus('submitting');
      setServerMessage('');

      try {
          const res = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  nome: formData.nome,
                  email: formData.email,
                  telefono: '', // Not required for feedback
                  servizio: 'Feedback',
                  messaggio: `[RATING: ${rating} Stelle]\n\n${formData.messaggio}`,
                  privacy_check: true // Auto-consent based on explicit feedback submission
              }),
          });

          const data = await res.json();

          if (!res.ok) {
              setStatus('error');
              setServerMessage(data.error || 'Errore durante l\'invio.');
              return;
          }

          setStatus('success');
          setServerMessage('Grazie per il tuo prezioso feedback!');
          
          // Reset form after a few seconds and close
          setTimeout(() => {
              setIsOpen(false);
              setTimeout(() => {
                  setStatus('idle');
                  setRating(0);
                  setFormData({ nome: '', email: '', messaggio: '' });
                  setServerMessage('');
              }, 500);
          }, 2500);

      } catch (err) {
          setStatus('error');
          setServerMessage("Errore di connessione. Riprova più tardi.");
      }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        {children || <Button variant="ghost">{triggerLabel}</Button>}
      </DrawerTrigger>

      <DrawerContent>
        <div className="flex flex-col items-center justify-center text-center py-8 px-4 w-full">
          <DrawerHeader className="max-w-md w-full space-y-2">
            <DrawerTitle className="text-2xl font-bold">
              Lascia un Feedback
            </DrawerTitle>
            <DrawerDescription>
              La tua opinione aiuta questo progetto a crescere e migliorare. Ogni suggerimento è ben accetto!
            </DrawerDescription>
          </DrawerHeader>

          {status === 'success' ? (
              <div className="w-full max-w-md py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="w-16 h-16 text-success" />
                  <p className="text-xl font-medium text-text-primary">{serverMessage}</p>
              </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 mt-6">
                
                {status === 'error' && (
                    <div className="p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm text-left">
                        {serverMessage}
                    </div>
                )}

                {/* Rating */}
                <div className="text-left space-y-2">
                    <Label>Valuta la tua esperienza <span className="text-error">*</span></Label>
                    <div className="flex justify-start gap-2 py-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`h-8 w-8 cursor-pointer transition-all hover:scale-110 ${
                            rating >= star
                                ? "text-warning fill-warning"
                                : "text-surface-600 hover:text-warning/50"
                            }`}
                            onClick={() => setRating(star)}
                        />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="space-y-2">
                        <Label htmlFor="feed-nome" className="mb-2 block">Nome <span className="text-error">*</span></Label>
                        <Input 
                            id="feed-nome" 
                            type="text" 
                            placeholder="Il tuo nome" 
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="feed-email" className="mb-2 block">Email <span className="text-error">*</span></Label>
                        <Input 
                            id="feed-email" 
                            type="email" 
                            placeholder="mario@email.it" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                </div>

                {/* Message */}
                <div className="text-left space-y-2">
                    <Label htmlFor="feed-messaggio" className="mb-2 block">Messaggio <span className="text-error">*</span></Label>
                    <Textarea
                        id="feed-messaggio"
                        placeholder="Racconta la tua esperienza e/o consigliaci come migliorare..."
                        className="min-h-[120px]"
                        value={formData.messaggio}
                        onChange={(e) => setFormData({...formData, messaggio: e.target.value})}
                        required
                    />
                    <p className="text-xs text-text-muted mt-2">Inviando acconsenti al trattamento dati ai fini del riscontro.</p>
                </div>

                {/* Footer */}
                <DrawerFooter className="flex flex-col sm:flex-row gap-4 w-full p-0 pt-4">
                    <Button 
                        type="submit" 
                        className="w-full sm:flex-1 text-base shadow-md"
                        disabled={status === 'submitting'}
                    >
                        {status === 'submitting' ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin"/> Invio in corso...</>
                        ) : (
                            'Invia Feedback'
                        )}
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline" className="w-full sm:flex-1 text-base" type="button">
                            Annulla
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </form>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
