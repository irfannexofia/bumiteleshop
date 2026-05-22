"use client";

import { useState, useTransition } from "react";
import {
  AlertCircle,
  AtSign,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  User,
} from "lucide-react";

import {
  ClaimTextarea,
  FormField,
  InputWithIcon,
} from "@/components/claim/form-field";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitWarrantyClaimAction } from "@/server/actions/warranty-claim.actions";
import { PURCHASE_PLATFORMS } from "@/lib/claim";
import type { Product } from "@/db/schema";
import { cn } from "@/lib/utils";

type Step = 1 | 2;

type StepOneData = {
  purchasePlatform: string;
  marketplaceUsername: string;
  orderId: string;
  productId: string;
  productName: string;
  complaint: string;
};

type StepTwoData = {
  fullName: string;
  email: string;
  whatsappNumber: string;
  shippingAddress: string;
};

const emptyStepOne: StepOneData = {
  purchasePlatform: "",
  marketplaceUsername: "",
  orderId: "",
  productId: "",
  productName: "",
  complaint: "",
};

const emptyStepTwo: StepTwoData = {
  fullName: "",
  email: "",
  whatsappNumber: "",
  shippingAddress: "",
};

function StepIndicator({ step }: { step: Step }) {
  return (
    <div className="mb-6 flex items-center gap-2">
      {[1, 2].map((n) => (
        <div key={n} className="flex flex-1 items-center gap-2">
          <div
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
              step >= n
                ? "bg-[#0056b3] text-white"
                : "bg-slate-200 text-slate-500",
            )}
          >
            {n}
          </div>
          <span
            className={cn(
              "text-xs font-medium",
              step >= n ? "text-[#0056b3]" : "text-slate-400",
            )}
          >
            {n === 1 ? "Data pembelian" : "Data diri"}
          </span>
          {n === 1 && <div className="mx-1 h-px flex-1 bg-slate-200" />}
        </div>
      ))}
    </div>
  );
}

export function WarrantyClaimForm({ products }: { products: Product[] }) {
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<Step>(1);
  const [stepOne, setStepOne] = useState<StepOneData>(emptyStepOne);
  const [stepTwo, setStepTwo] = useState<StepTwoData>(emptyStepTwo);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ claimId: number; status: string } | null>(
    null,
  );

  const isLainnya = stepOne.purchasePlatform === "Lainnya";

  function validateStepOne(): string | null {
    if (!stepOne.purchasePlatform) return "Platform pembelian wajib dipilih";
    if (!stepOne.marketplaceUsername.trim()) return "Username wajib diisi";
    if (!stepOne.orderId.trim()) return "Order ID / No. Invoice wajib diisi";
    if (!stepOne.productId) return "Produk wajib dipilih";
    if (!stepOne.complaint.trim()) return "Keluhan wajib diisi";
    return null;
  }

  function handleNext() {
    setError(null);
    const err = validateStepOne();
    if (err) {
      setError(err);
      return;
    }
    setStep(2);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!stepTwo.fullName.trim()) {
      setError("Nama wajib diisi");
      return;
    }
    if (!stepTwo.email.trim()) {
      setError("Email wajib diisi");
      return;
    }
    if (!stepTwo.whatsappNumber.trim()) {
      setError("Nomor WhatsApp wajib diisi");
      return;
    }
    if (!stepTwo.shippingAddress.trim()) {
      setError("Alamat pengiriman wajib diisi");
      return;
    }

    const formData = new FormData();
    formData.set("purchasePlatform", stepOne.purchasePlatform);
    formData.set("marketplaceUsername", stepOne.marketplaceUsername);
    formData.set("orderId", stepOne.orderId);
    formData.set("productId", stepOne.productId);
    formData.set("product", stepOne.productName);
    formData.set("complaint", stepOne.complaint);
    formData.set("fullName", stepTwo.fullName);
    formData.set("email", stepTwo.email);
    formData.set("whatsappNumber", stepTwo.whatsappNumber);
    formData.set("shippingAddress", stepTwo.shippingAddress);

    startTransition(async () => {
      const result = await submitWarrantyClaimAction(formData);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setSuccess({
        claimId: result.claim.id,
        status: result.claim.status,
      });
      setStep(1);
      setStepOne(emptyStepOne);
      setStepTwo(emptyStepTwo);
    });
  }

  function handleProductChange(value: string | null) {
    const id = value ?? "";
    const selected = products.find((p) => String(p.id) === id);
    setStepOne((s) => ({
      ...s,
      productId: id,
      productName: selected?.name ?? "",
    }));
  }

  if (success) {
    return (
      <div className="bg-white px-5 pb-8 pt-6 font-sans">
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#0056b3]/10">
            <CheckCircle2 className="size-8 text-[#0056b3]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">
              Klaim berhasil dikirim!
            </h2>
            <p className="text-sm text-slate-500">
              Nomor klaim{" "}
              <span className="font-mono font-semibold text-[#0056b3]">
                #{success.claimId}
              </span>
            </p>
            <p className="text-sm text-slate-500">
              Status:{" "}
              <span className="font-medium text-slate-700">
                {success.status === "pending" ? "Menunggu review" : success.status}
              </span>
            </p>
          </div>
          <p className="max-w-xs text-xs text-slate-500">
            Tim CS akan menghubungi Anda melalui WhatsApp.
          </p>
          <Button
            type="button"
            className="mt-2 w-full rounded-xl bg-[#0056b3] font-semibold hover:bg-[#004494]"
            onClick={() => setSuccess(null)}
          >
            Ajukan klaim lain
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white px-5 pb-8 pt-6 font-sans">
      <div className="mb-2">
        <h2 className="text-lg font-bold text-[#0056b3]">Form Claim Garansi</h2>
        <p className="mt-1 text-sm text-slate-500">
          {step === 1
            ? "Lengkapi data pembelian dan keluhan produk."
            : "Lengkapi data diri untuk pengiriman dan kontak."}
        </p>
      </div>

      <StepIndicator step={step} />

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          {error}
        </div>
      )}

      {step === 1 ? (
        <div className="space-y-4">
          <FormField label="Platform pembelian">
            <Select
              value={stepOne.purchasePlatform || null}
              onValueChange={(v) =>
                setStepOne((s) => ({ ...s, purchasePlatform: v ?? "" }))
              }
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 shadow-sm">
                <SelectValue placeholder="Pilih platform" />
              </SelectTrigger>
              <SelectContent>
                {PURCHASE_PLATFORMS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            label="Username"
            hint={
              isLainnya
                ? "Untuk platform Lainnya, isi dengan username Instagram Anda."
                : "Username akun di platform pembelian."
            }
          >
            <InputWithIcon
              value={stepOne.marketplaceUsername}
              onChange={(e) =>
                setStepOne((s) => ({
                  ...s,
                  marketplaceUsername: e.target.value,
                }))
              }
              placeholder={
                isLainnya ? "@username_instagram" : "@username_toko"
              }
              icon={<AtSign className="size-4" />}
            />
          </FormField>

          <FormField label="Order ID / No. Invoice">
            <InputWithIcon
              value={stepOne.orderId}
              onChange={(e) =>
                setStepOne((s) => ({ ...s, orderId: e.target.value }))
              }
              placeholder="Contoh: INV/2405/000123"
              icon={<Copy className="size-4" />}
            />
          </FormField>

          <FormField label="Produk">
            <Select
              value={stepOne.productId || null}
              onValueChange={handleProductChange}
              disabled={products.length === 0}
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-white shadow-sm">
                <SelectValue placeholder="Pilih produk">
                  {stepOne.productName ? (
                    <span className="truncate text-slate-900">
                      {stepOne.productName}
                    </span>
                  ) : null}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={String(p.id)} label={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {products.length === 0 && (
              <p className="text-xs text-amber-600">Jalankan: npm run db:seed</p>
            )}
          </FormField>

          <FormField label="Keluhan">
            <ClaimTextarea
              value={stepOne.complaint}
              onChange={(e) =>
                setStepOne((s) => ({ ...s, complaint: e.target.value }))
              }
              placeholder="Jelaskan kerusakan atau masalah pada produk"
              rows={4}
            />
          </FormField>

          <Button
            type="button"
            onClick={handleNext}
            className="h-12 w-full rounded-xl bg-[#0056b3] text-base font-semibold text-white shadow-md shadow-[#0056b3]/25 hover:bg-[#004494]"
          >
            Selanjutnya
            <ChevronRight className="size-4" />
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Nama">
            <InputWithIcon
              value={stepTwo.fullName}
              onChange={(e) =>
                setStepTwo((s) => ({ ...s, fullName: e.target.value }))
              }
              placeholder="Nama lengkap"
              icon={<User className="size-4" />}
            />
          </FormField>

          <FormField label="Email">
            <InputWithIcon
              type="email"
              value={stepTwo.email}
              onChange={(e) =>
                setStepTwo((s) => ({ ...s, email: e.target.value }))
              }
              placeholder="email@contoh.com"
              icon={<Mail className="size-4" />}
            />
          </FormField>

          <FormField label="No. WhatsApp">
            <InputWithIcon
              type="tel"
              value={stepTwo.whatsappNumber}
              onChange={(e) =>
                setStepTwo((s) => ({ ...s, whatsappNumber: e.target.value }))
              }
              placeholder="081234567890"
              icon={<MessageCircle className="size-4" />}
            />
          </FormField>

          <FormField label="Alamat pengiriman">
            <div className="relative">
              <ClaimTextarea
                value={stepTwo.shippingAddress}
                onChange={(e) =>
                  setStepTwo((s) => ({ ...s, shippingAddress: e.target.value }))
                }
                placeholder="Alamat lengkap untuk pengembalian barang"
                rows={3}
                className="pr-10"
              />
              <MapPin className="pointer-events-none absolute right-3 top-3 size-4 text-slate-400" />
            </div>
          </FormField>

          <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
            Ongkir pengembalian barang ditanggung oleh pembeli.
          </p>

          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="h-12 flex-1 rounded-xl border-slate-300 font-semibold"
              onClick={() => {
                setStep(1);
                setError(null);
              }}
              disabled={isPending}
            >
              <ChevronLeft className="size-4" />
              Kembali
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="h-12 flex-[1.4] rounded-xl bg-[#0056b3] font-semibold text-white shadow-md shadow-[#0056b3]/25 hover:bg-[#004494]"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Mengirim…
                </>
              ) : (
                "Kirim Claim Garansi"
              )}
            </Button>
          </div>
        </form>
      )}

      <p className="mt-5 text-center text-[11px] leading-relaxed text-slate-400">
        Dengan mengirim formulir ini, Anda menyetujui syarat garansi Bumi Teleshop.
      </p>
    </div>
  );
}
