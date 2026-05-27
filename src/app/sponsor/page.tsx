import { Heart, Coffee, Sparkles, MessageCircle, Video } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "赞助作者 - 37PromptHub",
  description: "支持 37PromptHub 的持续发展",
};

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] py-16 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#171717] rounded-2xl mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-semibold text-[#171717] mb-4">
            赞助作者
          </h1>
          <p className="text-[#737373] text-lg leading-relaxed">
            如果这个工具对你有帮助，欢迎请我喝杯咖啡 ☕️
          </p>
        </div>

        {/* 感谢语 */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 mb-8">
          <div className="flex items-start gap-4">
            <Sparkles className="w-5 h-5 text-[#737373] mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-[#171717] mb-3">
                你的支持很重要
              </h2>
              <p className="text-[#737373] leading-relaxed mb-4">
                37PromptHub 是一个免费开源的 AI 绘图提示词库。从最初的想法到现在的功能，
                我投入了大量业余时间进行开发和维护。你的每一份支持，都能让我持续改进这个工具，
                为更多人提供更好的服务。
              </p>
              <p className="text-[#737373] leading-relaxed">
                无论金额大小，都是对我最大的鼓励。感谢你的认可与支持！
              </p>
            </div>
          </div>
        </div>

        {/* 收款码区域 */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8">
          <div className="flex items-center gap-3 mb-6">
            <Coffee className="w-5 h-5 text-[#737373]" />
            <h2 className="text-lg font-medium text-[#171717]">
              请我喝杯咖啡
            </h2>
          </div>

          <div className="flex flex-col items-center">
            {/* 收款码 */}
            <div className="w-64 h-64 rounded-xl overflow-hidden border border-[#e5e5e5] mb-6">
              <Image
                src="/qrcode.jpg"
                alt="收款码"
                width={256}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-[#737373] text-center">
              扫码即可支持，金额随意，心意最重要
            </p>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="mt-8 bg-white rounded-2xl border border-[#e5e5e5] p-8">
          <h2 className="text-lg font-medium text-[#171717] mb-6 text-center">
            更多联系方式
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f5f5f5]">
              <div className="w-10 h-10 bg-[#00a1d6] rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717]">Bilibili</p>
                <p className="text-sm text-[#737373]">太阳风_Solarwind</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f5f5f5]">
              <div className="w-10 h-10 bg-[#07c160] rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717]">微信</p>
                <p className="text-sm text-[#737373]">RS_0322（备注来意）</p>
              </div>
            </div>
          </div>
        </div>

        {/* 其他支持方式 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#a3a3a3] mb-4">
            除了打赏，你还可以通过以下方式支持：
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#737373]">
              ⭐ Star 项目
            </span>
            <span className="px-4 py-2 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#737373]">
              📤 分享给朋友
            </span>
            <span className="px-4 py-2 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#737373]">
              💡 提交建议
            </span>
          </div>
        </div>

        {/* 底部感谢 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#a3a3a3]">
            感谢每一位支持者的信任与鼓励
          </p>
        </div>
      </div>
    </div>
  );
}
