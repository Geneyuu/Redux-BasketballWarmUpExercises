import { Video } from 'expo-av';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const VideoPlayer = ({ videoRef, videoSource, isPlaying }) => (
    <View style={styles.videoContainer}>
        <Video
            ref={videoRef}
            style={styles.video}
            source={videoSource}
            resizeMode='cover'
            isLooping
            shouldPlay={isPlaying}
        />
    </View>
);

const styles = StyleSheet.create({
    videoContainer: {
        position: 'relative',
        top: -35,
        left: 0,
        bottom: 0,
        right: 0,
    },
    video: {
        width: wp('100%'),
        alignSelf: 'center',
        height: hp('58%'),
    },
});

export default VideoPlayer;
