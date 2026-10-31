import { Activity, Cpu, Radio } from "lucide-react";

export default function JarvisHUD() {
  return (
    <div className="jarvis-hud" aria-hidden="true">
      <div className="jarvis-hud-top">
        <span>J.A.R.V.I.S</span>
        <span>VISUAL ENGINE / 001</span>
      </div>

      <div className="jarvis-hud-left">
        <span>
          <Activity size={12} />
          ENERGY FIELD
        </span>

        <strong>ACTIVE</strong>
      </div>

      <div className="jarvis-hud-right">
        <span>
          <Cpu size={12} />
          CORE STATUS
        </span>

        <strong>STABLE</strong>
      </div>

      <div className="jarvis-hud-bottom">
        <span>
          <Radio size={12} />
          SIGNAL DETECTED
        </span>

        <span>SYS. 0.1.0</span>
      </div>
    </div>
  );
}