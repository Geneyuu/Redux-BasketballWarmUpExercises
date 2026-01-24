import { Audio } from "expo-av";
import { useEffect, useState } from "react";

const useSounds = () => {
	const [tickSound, setTickSound] = useState(null);
	const [soundsLoaded, setSoundsLoaded] = useState(false);

	useEffect(() => {
		let sound;

		const loadTickSound = async () => {
			try {
				const { sound: newSound } = await Audio.Sound.createAsync(
					require("../../assets/sounds/ticking-sound-v3.mp3")
				);

				setTickSound(newSound);
				setSoundsLoaded(true);
				console.log("✅ Tick sound loaded!");
			} catch (error) {
				console.log("❌ Error loading tick sound:", error);
			}
		};

		loadTickSound();

		// Clean up when component unmounts
		return () => {
			if (sound) {
				sound.unloadAsync();
				console.log("🧹 Tick sound unloaded.");
			}
		};
	}, []);

	return {
		tickSound,
		soundsLoaded,
	};
};

export default useSounds;
