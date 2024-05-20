declare module 'vue/types/vue' {
    interface Vue {
        $filter(key: string, method: Function): void;
    }
}