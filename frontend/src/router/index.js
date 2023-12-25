import { createWebHistory, createRouter } from "vue-router";
import TaskList from '@/components/TaskList.vue';
import TaskForm from '@/components/TaskForm.vue';
import UserAuth from '@/components/UserAuth.vue';

const routes = [
    { path: '/', component: UserAuth , name: 'login'},
    { path: '/tasks', component: TaskList, name: 'tasks', meta: { requiresAuth: true } },
    { path: '/tasks/new', component: TaskForm, name: 'newTask', meta: { requiresAuth: true } },
    { path: '/tasks/:id/edit', component: TaskForm, name: 'editTask', props: true, meta: { requiresAuth: true } },
];

const router = new createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.meta.requiresAuth && !token) {
        next({ name: 'login' });
    } else if (to.name === 'login' && token) {
        next({ name: 'tasks' });
    } else {
        next();
    }
});

export default router;