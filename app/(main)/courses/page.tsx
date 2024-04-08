import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";


const Coursespage = async () =>{
    const coursesData=getCourses();
    const userProgressData =  getUserProgress();

    const [
        courses,
        userProgress,
    ] =await Promise.all([
        coursesData,
        userProgressData,
    ])

    return(
        <div className="h-full max-w-[912] px-3 mx-auto">
        <h1 className="text-2xl font-bold text-netural-700">
            Financial Knowledge Courses

        </h1>
        <List
          courses={courses}
          activeCourseId={userProgress?.activeCourseId}
        />
        </div>
    );
};

export default Coursespage;