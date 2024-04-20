import { redirect } from 'next/navigation';

import { FeedWrapper } from '@/components/feed-swrapper'
import StickyWrapper from '@/components/sticky-wrapper'
import { UserProgress } from '@/components/user-progress'

import Header from './header'
import { Unit } from './unit';

import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from '@/db/queries';
import { lessons, units as unitsSchema } from '@/db/schema';

const LearnPage = async () => {
  const unitsData = getUnits();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const userProgressData = getUserProgress();

  const [ 
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
  ] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData
  ]);

  if(!userProgress?.activeCourse) redirect("/courses");

  if(!courseProgress) redirect("/courses");

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title}/>
        {units.map((unit) => (
          <div className="mb-10" key={unit.id}>
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                unit: typeof unitsSchema.$inferSelect;
              } | undefined}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

export default LearnPage