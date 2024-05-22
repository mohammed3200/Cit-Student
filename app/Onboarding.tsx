import { View, Animated, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Images } from '@/constants';
import { StatusBar } from 'expo-status-bar';
import { OnboardingItem, Paginator, NextButton } from '@/components';



interface OnboardingProp { }

const slides = [
  {
    title: "تجربة تسجيل الدخول المبسّطة والآمنة",
    description: "يمكن للطلاب تسجيل الدخول إلى التطبيق باستخدام رقم القيد وكلمة المرور الخاصة بهم أو باستخدام رمز المشارك السريع، مما يوفر سهولة وأمان في الوصول إلى المعلومات الشخصية",
    image: Images.undraw_login
  },
  {
    title: "جدول محاضرات ملائم لأجهزة الهاتف الذكي",
    description: "يمكن للطلاب الوصول إلى جدول المحاضرات المناسب لأجهزة الهاتف الذكي، مما يتيح لهم تنظيم ومتابعة المواعيد والمواد الدراسية بسهولة",
    image: Images.undraw_table
  },
  {
    title: "تتبع الدرجات بشكل منسق وشامل",
    description: "مكن للطلاب الاطلاع على الكشوف الدراسية الخاصة بهم لجميع الفصول التي درسوها بشكل منسق وسهل القراءة، مما يساعدهم في متابعة تقدمهم الأكاديمي.",
    image: Images.undraw_grades
  },
  {
    title: "آخر الإعلانات والتنبيهات الهامة",
    description: "يمكن للطلاب الاطلاع على آخر الإعلانات والأخبار الهامة التي تهمهم، وسيتم إرسال تنبيهات لهم في حالة نشر إعلان جديد، مما يساعدهم في البقاء مطلعين على أحدث التطورات في الكلية",
    image: Images.undraw_notifications
  },
]
const Onboarding: React.FC<OnboardingProp> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [last, setLast] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<any>>(null);

  const viewableItemChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 })
    } else {
      // navigation.navigate('Login')
      console.log('Last Item');
    }
  }
  useEffect(() => {
    if (currentIndex === slides.length - 1) setLast(true)
    else setLast(false);
  }, [currentIndex]);

  return (
    <View className='flex-1 justify-center items-center'>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.title}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX }
                }
              }
            ], {
            useNativeDriver: false,
          }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View className='flex-1 flex-col'>
        <View className='absolute -top-48 right-9 left-12'>
          <Paginator data={slides} scrollX={scrollX} />
        </View>
        <View className='mt-20'>
          <NextButton
            label={last ? "هيا بنا نبدء" : "التالي"}
            variant={last ? "primary" : "default"}
            onPress={scrollTo}
          />
        </View>
      </View>
      <StatusBar style='light' backgroundColor='#222' />
    </View>
  )
}

export default Onboarding;