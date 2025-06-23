import { StyleSheet, View } from 'react-native';
import Categories from './components/Categories';
import FeaturedExercises from './components/FeaturedExercises';
import FirstTimeModal from './components/FirstTimeModal';
import Header from './components/Header';

const HomeIndex = () => {
     return (
          <View style={styles.HomeContainer}>
               <Header />
               <FirstTimeModal />
               <FeaturedExercises />
               <Categories />
          </View>
     );
};

const styles = StyleSheet.create({
     safeArea: {
          flex: 1,
          backgroundColor: 'white',
     },
     HomeContainer: {
          flex: 1,
          backgroundColor: 'white',
     },
});

export default HomeIndex;
