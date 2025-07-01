import { Video } from "expo-av";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { exercises } from "../../../constants/exercises";

const FeaturedExercises = () => {
	const [videosToShow, setVideosToShow] = useState([]);
	const [currentSlide, setCurrentSlide] = useState(0);

	// Pick 3 random videos
	useEffect(() => {
		const videosWithClips = exercises.filter((exercise) => exercise.video);
		const shuffled = [...videosWithClips].sort(() => Math.random() - 0.5);
		setVideosToShow(shuffled.slice(0, 3));
	}, []);

	if (videosToShow.length === 0) return null;

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Featured Exercises</Text>
			<Carousel
				loop
				width={wp(100)}
				height={hp(35)}
				data={videosToShow}
				onSnapToItem={setCurrentSlide}
				renderItem={({ item, index }) => (
					<View style={styles.slide}>
						<Video
							source={item.video}
							style={styles.video}
							resizeMode="cover"
							shouldPlay={index === currentSlide}
							isLooping
							isMuted
						/>
					</View>
				)}
				autoPlay
				autoPlayInterval={3000}
				pagingEnabled
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.8,
					parallaxScrollingOffset: wp(25),
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	heading: {
		fontSize: hp("2.3%"),
		fontWeight: "bold",
		alignSelf: "flex-start",
		marginLeft: wp(5),
		marginTop: hp(2),
		marginBottom: hp(-2),
	},
	slide: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: wp(2),
		overflow: "hidden",
	},
	video: {
		width: "100%",
		height: "100%",
	},
});

export default FeaturedExercises;

// import { Video } from "expo-av";
// import { useEffect, useRef, useState } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import Carousel from "react-native-reanimated-carousel";
// import {
// 	heightPercentageToDP as hp,
// 	widthPercentageToDP as wp,
// } from "react-native-responsive-screen";
// import { exercises } from "../../../constants/exercises";

// const FeaturedExercises = () => {
// 	const [videosToShow, setVideosToShow] = useState([]);
// 	const [currentSlide, setCurrentSlide] = useState(0);
// 	const videoRefs = useRef([]);

// 	// Pick 3 random videos
// 	useEffect(() => {
// 		const videosWithClips = exercises.filter((exercise) => exercise.video);
// 		const shuffled = [...videosWithClips].sort(() => Math.random() - 0.5);
// 		setVideosToShow(shuffled.slice(0, 3));
// 	}, []);

// 	// Control playback
// 	useEffect(() => {
// 		const handleVideoPlayback = async () => {
// 			videoRefs.current.forEach(async (ref, idx) => {
// 				if (ref) {
// 					if (idx === currentSlide) {
// 						await ref.playAsync();
// 					} else {
// 						await ref.pauseAsync();
// 					}
// 				}
// 			});
// 		};

// 		handleVideoPlayback();
// 	}, [currentSlide]);

// 	if (videosToShow.length === 0) return null;

// 	return (
// 		<View style={styles.container}>
// 			<Text style={styles.heading}>Featured Exercises</Text>
// 			<Carousel
// 				loop
// 				width={wp(100)}
// 				height={hp(35)}
// 				data={videosToShow}
// 				onSnapToItem={setCurrentSlide}
// 				renderItem={({ item, index }) => (
// 					<View style={styles.slide}>
// 						<Video
// 							ref={(ref) => (videoRefs.current[index] = ref)}
// 							source={item.video}
// 							style={styles.video}
// 							resizeMode="cover"
// 							isLooping
// 							isMuted
// 						/>
// 					</View>
// 				)}
// 				autoPlay
// 				autoPlayInterval={3000}
// 				pagingEnabled
// 				mode="parallax"
// 				modeConfig={{
// 					parallaxScrollingScale: 0.8,
// 					parallaxScrollingOffset: wp(25),
// 				}}
// 			/>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		alignItems: "center",
// 	},
// 	heading: {
// 		fontSize: hp("2.3%"),
// 		fontWeight: "bold",
// 		alignSelf: "flex-start",
// 		marginLeft: wp(5),
// 		marginTop: hp(2),
// 		marginBottom: hp(-2),
// 	},
// 	slide: {
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		borderRadius: wp(2),
// 		overflow: "hidden",
// 	},
// 	video: {
// 		width: "100%",
// 		height: "100%",
// 	},
// });

// export default FeaturedExercises;
