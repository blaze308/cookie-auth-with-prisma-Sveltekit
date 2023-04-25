<script lang="ts">
	import { enhance } from "$app/forms";
       import type { ActionData } from "./$types"
       export let form: ActionData
</script>

<form action="?/login" method="POST" use:enhance>
    <div>
        <label for="username">USERNAME</label>
        <input type="text" id="username" name="username" required>
    </div>

    <div>
        <label for="username">PASSWORD</label>
        <input type="password" id="password" name="password" required>
    </div>

    {#if form?.invalid}
       <p class="error">Username and password required</p> 
    {/if}
    {#if form?.credentials}
       <p class="error">Invalid Credentials</p> 
    {/if}

    <button type="submit">Log in</button>
</form>