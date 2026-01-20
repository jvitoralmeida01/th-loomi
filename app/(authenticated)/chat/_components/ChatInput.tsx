"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useChatDispatch } from "../_store/hooks";
import {
  addAssistantMessage,
  addIncomingMessage,
  addAiSuggestion,
  setLoadingAiSuggestion,
} from "../_store/chatSlice";
import Image from "next/image";
import SendIcon from "@/assets/icons/send.svg";

const CUSTOMER_REPLIES = [
  "Entendi! Mas quanto isso vai custar a mais por mês?",
  "Ótimo, gostei da proposta! Pode me mandar mais detalhes?",
  "Hmm, preciso pensar um pouco. Tem algum desconto disponível?",
  "Perfeito! Quero contratar. Como faço?",
  "Interessante! E esse plano cobre roubo também?",
  "Legal! Vocês fazem parcelamento no cartão?",
  "Tá bom, vou conversar com minha esposa e te retorno.",
  "Show! Pode me enviar um comparativo dos planos?",
];

const AI_SUGGESTIONS = [
  "Baseado no perfil do cliente, recomendo a oferta Premium com desconto de 15%. Cliente tem histórico positivo.",
  "O cliente demonstrou interesse em cobertura adicional. Sugiro apresentar o pacote completo com 10% de desconto.",
  "Cliente está hesitante sobre o preço. Ofereça o parcelamento em até 12x sem juros.",
  "Momento ideal para fechar! Cliente engajado. Recomendo enviar a proposta formal agora.",
  "Cliente pediu comparativo. Envie a tabela de planos destacando o custo-benefício do Premium.",
  "Detectei que o cliente tem perfil para upsell. Sugira a proteção de equipamentos eletrônicos.",
];

const PROPOSAL_SENT_MESSAGES = [
  "Proposta enviada com sucesso! O cliente receberá por e-mail e WhatsApp. Acompanhe o status na aba de propostas.",
  "Pronto! Enviei a proposta personalizada para o cliente. Ele tem 48h para aceitar com o desconto especial.",
  "Proposta enviada! Baseado no histórico, clientes com esse perfil costumam aceitar em até 24h.",
];

function getRandomDelay(): number {
  return Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
}

function getRandomReply(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ChatInput() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useChatDispatch();
  const customerReplyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const aiSuggestionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (customerReplyTimeoutRef.current) {
        clearTimeout(customerReplyTimeoutRef.current);
      }
      if (aiSuggestionTimeoutRef.current) {
        clearTimeout(aiSuggestionTimeoutRef.current);
      }
    };
  }, []);

  const scheduleAiSuggestion = useCallback(() => {
    if (aiSuggestionTimeoutRef.current) {
      clearTimeout(aiSuggestionTimeoutRef.current);
    }

    dispatch(setLoadingAiSuggestion(true));

    const delay = getRandomDelay();
    aiSuggestionTimeoutRef.current = setTimeout(() => {
      dispatch(addAiSuggestion({ content: getRandomReply(AI_SUGGESTIONS) }));
    }, delay);
  }, [dispatch]);

  const scheduleCustomerReply = useCallback(() => {
    if (customerReplyTimeoutRef.current) {
      clearTimeout(customerReplyTimeoutRef.current);
    }

    const delay = getRandomDelay();
    customerReplyTimeoutRef.current = setTimeout(() => {
      dispatch(
        addIncomingMessage("Ricardo Leite", getRandomReply(CUSTOMER_REPLIES))
      );
      scheduleAiSuggestion();
    }, delay);
  }, [dispatch, scheduleAiSuggestion]);

  const handleSend = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    dispatch(addAssistantMessage(trimmedValue));
    setInputValue("");

    scheduleCustomerReply();
  }, [inputValue, dispatch, scheduleCustomerReply]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 bg-neutral-100/5 border border-glass-edge rounded-full pr-2 pl-6 py-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escreva aqui..."
          className="flex-1 bg-transparent text-neutral-100 placeholder-neutral-400 font-montserrat text-sm outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className="disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          <Image src={SendIcon} alt="Send" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

export { PROPOSAL_SENT_MESSAGES, getRandomDelay, getRandomReply };
