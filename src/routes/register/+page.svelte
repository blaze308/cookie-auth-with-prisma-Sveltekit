<script lang="ts">
    import type { ActionData } from "./$types"

    export let form: ActionData
</script>

<form action="?/register" method="POST" use:enhance>
    <div>
        <label for="username">USERNAME</label>
        <input type="text" id="username" name="username" required>
    </div>

    <div>
        <label for="username">PASSWORD</label>
        <input type="password" id="password" name="password" required>
    </div>

    {#if form?.user}
       <p class="error">Username is taken</p> 
    {/if}

    <button type="submit">Register</button>
</form>