"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { QRCodeCanvas } from "qrcode.react";

type FormData = {
  type: string;
  text?: string;
  url?: string;
  tel?: string;
  email?: string;
  sms?: string;
  ssid?: string;
  password?: string;
  wifiName?: string;
  latitude?: string;
  longitude?: string;
  phone?: string;
  message?: string;
  lineId?: string;
  facebookUrl?: string;
  instagram?: string;
  promptpayId?: string;
  amount?: string;
};

export default function QRCodePage() {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const [qrValue, setQrValue] = useState("");
  const [fgColor, setFgColor] = useState("#4F46E5");
  const qrRef = useRef<HTMLDivElement | null>(null);

  const dataType = watch("type", "text");

  const onSubmit = (data: FormData) => {
    let value = "";

    switch (data.type) {
      case "text":
        value = data.text || "";
        break;
      case "url":
        value = data.url
          ? data.url.startsWith("http")
            ? data.url
            : `https://${data.url}`
          : "";
        break;
      case "tel":
        value = data.tel ? `tel:${data.tel}` : "";
        break;
      case "email":
        value = data.email ? `mailto:${data.email}` : "";
        break;
      case "sms":
        value = data.sms ? `sms:${data.sms}` : "";
        break;
      case "wifi":
        const ssid = data.ssid || "";
        const password = data.password || "";
        value = `WIFI:T:WPA;S:${ssid};P:${password};;`;
        break;
      case "maps":
        value = `https://www.google.com/maps?q=${data.latitude},${data.longitude}`;
        break;
      case "whatsapp":
        value = `https://wa.me/${data.phone}?text=${encodeURIComponent(
          data.message || ""
        )}`;
        break;
      case "line":
        value = `https://line.me/ti/p/${data.lineId}`;
        break;
      case "facebook":
        value = data.facebookUrl || "";
        break;
      case "instagram":
        value = `https://instagram.com/${data.instagram}`;
        break;
      default:
        value = "";
    }

    setQrValue(value);
  };

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "qr-code.png";
        a.click();
      }
    }
  };

  const typeOptions = [
    { value: "text", label: "📝 ข้อความ", icon: "📝" },
    { value: "url", label: "🌐 เว็บไซต์", icon: "🌐" },
    { value: "tel", label: "📞 เบอร์โทร", icon: "📞" },
    { value: "email", label: "✉️ อีเมล", icon: "✉️" },
    { value: "sms", label: "💬 SMS", icon: "💬" },
    { value: "wifi", label: "📶 Wi-Fi", icon: "📶" },
    { value: "maps", label: "📍 พิกัด (Google Maps)", icon: "📶" },
    { value: "whatsapp", label: "💬 WhatsApp", icon: "💬" },
    { value: "line", label: "🟢 Line", icon: "🟢" },
    { value: "facebook", label: "🔵 Facebook", icon: "🔵" },
    { value: "instagram", label: "📷 Instagram", icon: "📷" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center py-8 px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-tr from-blue-400 to-indigo-400 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/50 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">🔲</span>
          </div>
          <h1 className="text-3xl font-bold text-[#424242]">สร้าง QR Code</h1>
          <p className="text-[#424242] opacity-70 mt-2">
            สร้าง QR Code สวยงามได้ในทันที
          </p>
        </div>

        <div className="space-y-6">
          {/* Type selector */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-[#424242]">
              เลือกประเภท
            </label>
            <div className="relative">
              <select
                {...register("type")}
                className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 rounded-2xl appearance-none cursor-pointer transition-all duration-200 text-[#424242] font-medium"
                defaultValue="text"
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Dynamic input fields */}
          <div className="space-y-4">
            {dataType === "text" && (
              <div className="relative">
                <input
                  {...register("text")}
                  placeholder="กรอกข้อความที่ต้องการ..."
                  className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl transition-all duration-200 placeholder-gray-400 text-[#424242]"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  📝
                </div>
              </div>
            )}
            {dataType === "url" && (
              <div className="relative">
                <input
                  {...register("url")}
                  placeholder="www.example.com"
                  className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl transition-all duration-200 placeholder-gray-400 text-[#424242]"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  🌐
                </div>
              </div>
            )}
            {dataType === "tel" && (
              <div className="relative">
                <input
                  {...register("tel")}
                  placeholder="เช่น 0812345678"
                  className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl transition-all duration-200 placeholder-gray-400 text-[#424242]"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  📞
                </div>
              </div>
            )}
            {dataType === "email" && (
              <div className="relative">
                <input
                  {...register("email")}
                  placeholder="you@example.com"
                  className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl transition-all duration-200 placeholder-gray-400 text-[#424242]"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  ✉️
                </div>
              </div>
            )}
            {dataType === "sms" && (
              <div className="relative">
                <input
                  {...register("sms")}
                  placeholder="เบอร์ปลายทาง"
                  className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl transition-all duration-200 placeholder-gray-400 text-[#424242]"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  💬
                </div>
              </div>
            )}
            {dataType === "wifi" && (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    {...register("ssid")}
                    placeholder="ชื่อ Wi-Fi (SSID)"
                    className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl transition-all duration-200 placeholder-gray-400 text-[#424242]"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    📶
                  </div>
                </div>
                <div className="relative">
                  <input
                    {...register("password")}
                    placeholder="รหัสผ่าน"
                    type="password"
                    className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl transition-all duration-200 placeholder-gray-400 text-[#424242]"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    🔒
                  </div>
                </div>
              </div>
            )}
            {dataType === "maps" && (
              <>
                <div className="relative">
                  <input
                    {...register("latitude")}
                    placeholder="ละติจูด (Latitude)"
                    className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl placeholder-gray-400 text-[#424242]"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🗺️
                  </div>
                </div>
                <div className="relative">
                  <input
                    {...register("longitude")}
                    placeholder="ลองจิจูด (Longitude)"
                    className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl placeholder-gray-400 text-[#424242]"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    📍
                  </div>
                </div>
              </>
            )}

            {dataType === "whatsapp" && (
              <>
                <div className="relative">
                  <input
                    {...register("phone")}
                    placeholder="เบอร์ WhatsApp (เช่น 66812345678)"
                    className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl placeholder-gray-400 text-[#424242]"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    📱
                  </div>
                </div>
                <div className="relative">
                  <input
                    {...register("message")}
                    placeholder="ข้อความล่วงหน้า (optional)"
                    className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl placeholder-gray-400 text-[#424242]"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    💬
                  </div>
                </div>
              </>
            )}

            {dataType === "line" && (
              <div className="relative">
                <input
                  {...register("lineId")}
                  placeholder="Line ID (ไม่มี @)"
                  className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl placeholder-gray-400 text-[#424242]"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🟢
                </div>
              </div>
            )}

            {dataType === "facebook" && (
              <div className="relative">
                <input
                  {...register("facebookUrl")}
                  placeholder="ลิงก์เพจ หรือโปรไฟล์ Facebook"
                  className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl placeholder-gray-400 text-[#424242]"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔵
                </div>
              </div>
            )}

            {dataType === "instagram" && (
              <div className="relative">
                <input
                  {...register("instagram")}
                  placeholder="Instagram username (เช่น yourname)"
                  className="w-full bg-gray-50/50 backdrop-blur border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 p-4 pl-12 rounded-2xl placeholder-gray-400 text-[#424242]"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📷
                </div>
              </div>
            )}
          </div>

          {/* Color picker */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-[#424242]">
              เลือกสี QR Code
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg cursor-pointer"
                />
              </div>
              <div className="flex space-x-2">
                {[
                  "#4F46E5",
                  "#EC4899",
                  "#10B981",
                  "#F59E0B",
                  "#EF4444",
                  "#8B5CF6",
                ].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFgColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      fgColor === color
                        ? "border-gray-400 scale-110"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>✨</span>
              <span>สร้าง QR Code</span>
            </span>
          </button>
        </div>

        {/* QR Code display */}
        {qrValue && (
          <div className="mt-8 text-center" ref={qrRef}>
            <div className="inline-block p-6 bg-white rounded-3xl shadow-2xl border border-gray-100">
              <QRCodeCanvas
                value={qrValue}
                size={240}
                fgColor={fgColor}
                bgColor="#FFFFFF"
                includeMargin={true}
                level="M"
              />
            </div>

            <div className="mt-6 p-4 bg-gray-50/50 backdrop-blur rounded-2xl border border-gray-200">
              <p className="text-sm text-[#424242] break-all font-medium">
                <span className="text-[#424242] font-semibold">QR สำหรับ:</span>{" "}
                {qrValue}
              </p>
            </div>

            <button
              onClick={downloadQRCode}
              className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>⬇️</span>
                <span>ดาวน์โหลด PNG</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
