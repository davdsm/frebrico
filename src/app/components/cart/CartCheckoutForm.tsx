import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { ContentLink } from "../common/ContentLink";
import { useContent } from "../../content/useContent";
import { useCustomerAuth } from "../../auth/CustomerAuthContext";
import { useCart } from "../../cart/CartContext";
import { createCheckoutOrder } from "../../auth/customerAuthApi";
import { computeTotal } from "../../cart/shippingUtils";
import type { ShippingResult } from "../../cart/shippingUtils";

interface CartCheckoutFormProps {
  shipping: ShippingResult;
  onCountryChange: (country: string) => void;
}

export function CartCheckoutForm({ shipping, onCountryChange }: CartCheckoutFormProps) {
  const navigate = useNavigate();
  const contactTitle = useContent("cart", "checkout", "contact_title");
  const loginLink = useContent("cart", "checkout", "login_link");
  const loginLinkUrl = useContent("cart", "checkout", "login_link_url");
  const continueShopping = useContent("cart", "checkout", "continue_shopping");
  const continueShoppingUrl = useContent("cart", "checkout", "continue_shopping_url");
  const submitButton = useContent("cart", "checkout", "submit_button");
  const { user, login, logout, token } = useCustomerAuth();
  const { items, subtotal, clearCart } = useCart();
  const total = computeTotal(subtotal, shipping);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    postalCode: "",
    city: "",
    country: "PT",
    phone: "",
    nif: "",
    observations: "",
    acceptTerms: false,
  });
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const [firstName = "", ...rest] = (user.profile.name || "").trim().split(" ");
    setForm((prev) => ({
      ...prev,
      email: user.email || "",
      firstName: firstName || prev.firstName,
      lastName: rest.join(" ") || prev.lastName,
      address: user.profile.address || prev.address,
      postalCode: user.profile.postalCode || prev.postalCode,
      city: user.profile.locality || prev.city,
      phone: user.profile.phone || prev.phone,
      nif: user.profile.nif || prev.nif,
      country: "PT",
    }));
  }, [user]);

  const onChange = (key: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validateCheckout = (): string | null => {
    if (items.length === 0) return "O carrinho esta vazio.";
    if (!form.email || !form.firstName || !form.address || !form.postalCode || !form.city || !form.phone || !form.nif) {
      return "Preencha todos os campos obrigatorios, incluindo NIF.";
    }
    if (!form.acceptTerms) {
      return "Deve aceitar os Termos e Condições para continuar.";
    }
    return null;
  };

  const handlePlaceOrder = async () => {
    setCheckoutError("");
    const validationError = validateCheckout();
    if (validationError) {
      setCheckoutError(validationError);
      return;
    }
    setCheckoutLoading(true);
    try {
      const result = await createCheckoutOrder(
        {
          email: form.email,
          name: `${form.firstName} ${form.lastName}`.trim(),
          address: form.address,
          region: form.country,
          district: "",
          locality: form.city,
          postalCode: form.postalCode,
          phone: form.phone,
          nif: form.nif,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            variant: item.variant,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          })),
          subtotal,
          total,
          observations: form.observations,
        },
        token ?? undefined
      );
      clearCart();
      navigate(`/order/success?order=${encodeURIComponent(result.orderNumber)}`);
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Nao foi possivel concluir a encomenda.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const accountLoginUrl = "/login?mode=customer&redirect=/cart";
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleCheckoutLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      await login(loginEmail, loginPassword);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Nao foi possivel iniciar sessao.");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">{contactTitle}</h2>
          {!user && (
            <ContentLink to={accountLoginUrl || loginLinkUrl} className="text-sm text-[#313b2e] hover:underline">
              {loginLink}
            </ContentLink>
          )}
        </div>
        {!user && (
          <form onSubmit={handleCheckoutLogin} className="rounded-xl border border-[#dcdcdc] bg-[#fafaf9] p-4 flex flex-col gap-3">
            <p className="text-sm font-medium text-[#131313]">Ja tem conta? Entre para preencher automaticamente a morada.</p>
            {loginError && <p className="text-sm text-red-700">{loginError}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Email"
                required
                className="md:col-span-1 w-full px-4 py-2.5 border border-[#dcdcdc] rounded-lg text-sm"
              />
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                required
                className="md:col-span-1 w-full px-4 py-2.5 border border-[#dcdcdc] rounded-lg text-sm"
              />
              <button
                type="submit"
                disabled={loginLoading}
                className="md:col-span-1 w-full px-4 py-2.5 rounded-lg bg-[#313b2e] text-white text-sm font-semibold disabled:opacity-70"
              >
                {loginLoading ? "A entrar..." : "Entrar"}
              </button>
            </div>
          </form>
        )}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full flex-1 min-w-0 px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors"
          />
          {user && (
            <button
              type="button"
              onClick={() => logout()}
              className="shrink-0 px-4 py-3 rounded-lg border border-[#dcdcdc] text-sm font-medium text-[#313b2e] hover:bg-[#f7f7f5] transition-colors whitespace-nowrap"
            >
              Terminar sessão
            </button>
          )}
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="w-5 h-5 border-2 border-[#dcdcdc] rounded accent-[#313b2e]" />
          <span className="text-sm text-[#5a5a59]">Enviar-me novidades e ofertas por email</span>
        </label>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-black">Morada de envio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nome" value={form.firstName} onChange={(e) => onChange("firstName", e.target.value)} className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
          <input type="text" placeholder="Apelido" value={form.lastName} onChange={(e) => onChange("lastName", e.target.value)} className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
        </div>
        <input type="text" placeholder="Morada" value={form.address} onChange={(e) => onChange("address", e.target.value)} className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
        <input type="text" placeholder="Apartamento, suite, etc. (opcional)" value={form.apartment} onChange={(e) => onChange("apartment", e.target.value)} className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Código Postal" value={form.postalCode} onChange={(e) => onChange("postalCode", e.target.value)} className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
          <input type="text" placeholder="Cidade" value={form.city} onChange={(e) => onChange("city", e.target.value)} className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
          <select
            className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors appearance-none bg-white"
            value={form.country}
            onChange={(e) => {
              onChange("country", e.target.value);
              onCountryChange(e.target.value);
            }}
          >
            <option value="" disabled>País/Região</option>
            <option value="PT">Portugal Continental</option>
            <option value="PT_ISLANDS">Portugal — Ilhas (Açores / Madeira)</option>
            <option value="ES">Espanha</option>
            <option value="FR">França</option>
            <option value="OTHER">Outro país</option>
          </select>
        </div>
        <input type="tel" placeholder="Contacto" value={form.phone} onChange={(e) => onChange("phone", e.target.value)} className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
        <input type="text" placeholder="NIF" value={form.nif} onChange={(e) => onChange("nif", e.target.value)} className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
        <textarea
          placeholder="Observações (opcional)"
          value={form.observations}
          onChange={(e) => onChange("observations", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors resize-none"
        />
      </div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.acceptTerms as boolean}
          onChange={(e) => onChange("acceptTerms", e.target.checked)}
          className="mt-0.5 w-5 h-5 shrink-0 border-2 border-[#dcdcdc] rounded accent-[#313b2e]"
        />
        <span className="text-sm text-[#5a5a59] leading-snug">
          Li e aceito os{" "}
          <Link to="/terms" className="text-[#313b2e] underline hover:text-[#313b2e]/70">
            Termos e Condições
          </Link>{" "}
          e a{" "}
          <Link to="/privacy" className="text-[#313b2e] underline hover:text-[#313b2e]/70">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>

      <div className="flex flex-col gap-4 pt-4 border-t border-[#dcdcdc]">
        {checkoutError && <p className="text-sm text-red-700">{checkoutError}</p>}
        <button type="button" onClick={handlePlaceOrder} disabled={checkoutLoading} className="w-full bg-[#313b2e] hover:bg-[#3d4937] transition-colors text-white px-8 py-4 rounded-lg font-semibold text-base disabled:opacity-70">
          {checkoutLoading ? "A processar..." : submitButton}
        </button>
        <ContentLink to={continueShoppingUrl} className="text-sm text-[#313b2e] hover:underline text-center">
          {continueShopping}
        </ContentLink>
      </div>
    </div>
  );
}
