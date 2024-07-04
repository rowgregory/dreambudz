import { useEffect, useState } from "react";
import UIFx from "uifx";

const useSoundEffect = (soundFilePath: string) => {
  const [soundEffect, setSoundEffect] = useState<UIFx | null>(null);

  useEffect(() => {
    if (soundFilePath) {
      setSoundEffect(new UIFx(soundFilePath));
    }
  }, [soundFilePath]);

  return soundEffect;
};

export default useSoundEffect;
