export default function StatusBar() {
  return (
    <div className="flex-shrink-0 h-[28px] bg-white flex items-center justify-between px-4 z-50 rounded-t-[32px]">
      <div className="text-[12px] font-bold text-black">9:41</div>
      <div className="text-[10px] font-medium text-black flex gap-1 items-center">
        <span>Signal</span>
        <span>WiFi</span>
        <span>100%</span>
      </div>
    </div>
  );
}
