import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const categoryData = [
     {
          title: 'Whole Body Exercises',
          imageUri: require('./../../../../assets/images/ShoulderRoll.jpg'),
          navigationPath: 'home/WholeBody/WholeBodyIndex',
     },
     {
          title: 'Upper Body Activation',
          imageUri: require('./../../../../assets/images/Defensive Slides.jpg'),
          navigationPath: 'home/UpperBody/UpperBodyIndex',
     },
     {
          title: 'Lower Body Activation',
          imageUri: require('./../../../../assets/images/Side Stretch.jpg'),
          navigationPath: 'home/LowerBody/LowerBodyIndex',
     },
     {
          title: 'Dynamic Exercises',
          imageUri: require('./../../../../assets/images/Squat.jpg'),
          navigationPath: 'home/DynamicExercises/DynamicExercisesIndex',
     },
];

const CategoryCard = ({ title, imageUri, navigationPath }) => {
     const router = useRouter();
     const [isNavigating, setIsNavigating] = useState(false);

     const handlePress = () => {
          if (!isNavigating) {
               setIsNavigating(true);
               router.push(navigationPath);
               setTimeout(() => {
                    setIsNavigating(false);
               }, 1000);
          }
     };

     return (
          <TouchableOpacity style={styles.categoryCard} onPress={handlePress} disabled={isNavigating}>
               <Image style={styles.cardImage} source={imageUri} />
               <Text style={styles.cardText}>{title}</Text>
          </TouchableOpacity>
     );
};

const Categories = () => (
     <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView contentContainerStyle={styles.categoriesGrid} showsVerticalScrollIndicator={false}>
               {categoryData.map((category, index) => (
                    <CategoryCard key={index} {...category} />
               ))}
          </ScrollView>
     </View>
);

const styles = StyleSheet.create({
     categoriesContainer: {
          width: wp('100%'),
          flex: 1,
          justifyContent: 'flex-start',
          paddingHorizontal: wp(5),
          marginTop: hp(-2),
     },

     categoriesGrid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingBottom: hp(2),
     },

     sectionTitle: {
          fontSize: hp('2.3%'),
          fontFamily: 'Roboto-ExtraBold',
          color: '#000',
     },

     categoryCard: {
          width: '47%',
          alignItems: 'center',
     },

     cardImage: {
          width: wp(40),
          height: hp(12.5),
          borderRadius: 10,
          marginTop: 10,
     },

     cardText: {
          marginTop: 5,
          fontSize: wp(3.5),
          textAlign: 'center',
          fontFamily: 'Karla-Regular',
          color: '#000',
     },
});

export default Categories;
