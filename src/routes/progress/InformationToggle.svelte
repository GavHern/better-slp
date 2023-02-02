<script lang="ts">
    import { writable } from "svelte-local-storage-store";
    import { slide } from "svelte/transition";
    import NextDayOff from "./NextDayOff.svelte";
    import YearProgressUpdate from "./YearProgressUpdate.svelte";

    let toggle = writable('bslp-progress-information-toggle', false);

    // put 'NextDayOff.svelte' inside the toggle
    // put 'YearProgreeUpdate.svelte' inside the toggle

    const dataList = [
        {name: 'Next Day Off', amount: 0, component: NextDayOff},
        {name: 'School End Date' , amount: 0, component: YearProgressUpdate},
    ]
</script>

<!-- Creating the Toggle -->