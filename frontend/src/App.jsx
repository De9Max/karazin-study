import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CheckAuth from "./components/auth/CheckAuth.jsx";
import {ProtectedRoute, AdminRoute} from "./components/auth/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Header from "./components/Multi/Header.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import CoursesPage from "./pages/Dashboard/MainPage/CoursesPage.jsx";
import DashboardMainPage from "./pages/Dashboard/MainPage/MainPage.jsx";
import CourseTasksPage from "./pages/Dashboard/MainPage/CourseTasksPage.jsx";
import UsersPage from "./pages/AdminPage/UsersPage.jsx";
import AdminCoursesPage from "./pages/AdminPage/CoursesPage.jsx";
import AdminCreateCoursesPage from "./pages/AdminPage/CoursesCreatePage.jsx";
import AdminEditCoursesPage from "./pages/AdminPage/CoursesEditPage.jsx"
import AdminCreateTaskPage from "./pages/AdminPage/TaskCreatePage.jsx"
import AdminEditTaskPage from "./pages/AdminPage/TaskEditPage.jsx"
import AdminReviewTaskPage from "./pages/AdminPage/TaskReviewPage.jsx"
import GroupsPage from "./pages/AdminPage/GroupsPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <ToastContainer theme={'colored'}/>
            <Header/>
            <br/>
            <br/>
            <Routes>
                <Route path='/' element={<CheckAuth/>}>
                    <Route index element={<HomePage/>}/>

                    <Route path="/dashboard" element={<ProtectedRoute redirectPath="/auth/login"/>}>
                        <Route index element={<DashboardMainPage/>}/>
                        <Route path="courses" element={<CoursesPage/>}/>
                        <Route path="courses/:courseId" element={<CourseTasksPage/>}/>
                    </Route>

                    <Route path='/auth' element={<ProtectedRoute shouldLoggedIn={false} redirectPath="/dashboard"/>}>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="register" element={<RegisterPage/>}/>
                    </Route>


                    <Route path='/admin' element={<AdminRoute redirectPath="/dashboard"/>}>
                        <Route index element={<UsersPage/>}/>
                        <Route path="groups" element={<GroupsPage/>}/>
                        <Route path="courses" element={<AdminCoursesPage/>}/>
                        <Route path="courses/create" element={<AdminCreateCoursesPage/>}/>
                        <Route path="courses/edit/:courseId" element={<AdminEditCoursesPage/>}/>
                        <Route path="courses/tasks/create/:courseId" element={<AdminCreateTaskPage/>}/>
                        <Route path="courses/tasks/edit/:taskId" element={<AdminEditTaskPage/>}/>
                        <Route path="courses/tasks/review/:taskId" element={<AdminReviewTaskPage/>}/>
                    </Route>
                </Route>

                <Route path='*' element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App