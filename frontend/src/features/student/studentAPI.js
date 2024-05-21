import {createApi} from "@reduxjs/toolkit/query/react";
import {getBaseQuery} from "../config.js";

export const studentAPI = createApi({
    reducerPath: 'studentApi',
    baseQuery: getBaseQuery(),
    endpoints: (builder) => ({

        // Courses
        getCourses: builder.query({
            query: () => '../courses/my',
        }),
        getCourseById: builder.query({
            query: (courseId) => `../courses/${courseId}`,
        }),


        // Tasks
        getTasks: builder.query({
            query: (courseId) => `../tasks/${courseId}/me`,
            providesTags: ['UserTasks']
        }),
        sendTaskForReview: builder.mutation({
            query: (taskId) => ({
                url: `../tasks/send/${taskId}`,
                method: 'POST',
            }),
            invalidatesTags: ['UserTasks']
        }),

        // Timetable
        getTimeTable: builder.query({
            query: (groupId) => `../timetable/get_by_group/${groupId}/current`,
        }),
    }),
});

export const {
    useGetCoursesQuery,
    useGetCourseByIdQuery,
    useGetTasksQuery,
    useSendTaskForReviewMutation,
    useGetTimeTableQuery
} = studentAPI;
