<script>
    import supabase from "$lib/db";
import { each } from "svelte/internal";


    let ticketNum = 0;
    let num = [1,2,3,4,5];
    let fillField = "";
    let openForm = false;
    let totalAttendees = [];
    let defaultAttendee = {
            id: 1,
            fname: 'sk',
            lname: 'ak',
            email: 'sk1@gmail.com',
            pass: 'csdfsdssdsd'
    };
    function addPerson(attendee) {
        totalAttendees = totalAttendees.filter(m => m.id !== attendee.id);
        totalAttendees = [...totalAttendees, attendee];
    }
    const resetAttendee = () => {
        totalAttendees =[];
    }
    $: attendees = Array(ticketNum).fill(defaultAttendee).map((v, i) => ({...v, id: i}));

    function openAttendee(){     
        openForm = true;
    }

    async function createAttendee(){      
        if(totalAttendees.length==1) {
            const { data, error } = await supabase
            .from('attendee')
            .insert(
                [
                    { fname: totalAttendees[0].fname, lname:totalAttendees[0].lname, email:totalAttendees[0].email, password:totalAttendees[0].password }
                ]
            ) 
            if(data) alert("Insert Successfully")      
            if(error) alert("Insert Failed")
        }
        if(totalAttendees.length==2) {
            const { data, error } = await supabase
            .from('attendee')
            .insert([
                { fname: totalAttendees[0].fname, lname:totalAttendees[0].lname, email:totalAttendees[0].email, password:totalAttendees[0].password },
                { fname: totalAttendees[1].fname, lname:totalAttendees[1].lname, email:totalAttendees[1].email, password:totalAttendees[1].password },
            ]) 
            if(data) alert("Insert Successfully")      
            if(error) alert("Insert Failed")
        }    
        if(totalAttendees.length==3) {
            const { data, error } = await supabase
            .from('attendee')
            .insert([
                { fname: totalAttendees[0].fname, lname:totalAttendees[0].lname, email:totalAttendees[0].email, password:totalAttendees[0].password },
                { fname: totalAttendees[1].fname, lname:totalAttendees[1].lname, email:totalAttendees[1].email, password:totalAttendees[1].password },
                { fname: totalAttendees[2].fname, lname:totalAttendees[2].lname, email:totalAttendees[2].email, password:totalAttendees[2].password },
            ]) 
            if(data) alert("Insert Successfully")      
            if(error) alert("Insert Failed")
        }    
        if(totalAttendees.length==4) {
            const { data, error } = await supabase
            .from('attendee')
            .insert([
                { fname: totalAttendees[0].fname, lname:totalAttendees[0].lname, email:totalAttendees[0].email, password:totalAttendees[0].password },
                { fname: totalAttendees[1].fname, lname:totalAttendees[1].lname, email:totalAttendees[1].email, password:totalAttendees[1].password },
                { fname: totalAttendees[2].fname, lname:totalAttendees[2].lname, email:totalAttendees[2].email, password:totalAttendees[2].password },
                { fname: totalAttendees[3].fname, lname:totalAttendees[3].lname, email:totalAttendees[3].email, password:totalAttendees[3].password },
            ]) 
            if(data) alert("Insert Successfully")      
            if(error) alert("Insert Failed")
        }    
        if(totalAttendees.length==5) {
            const { data, error } = await supabase
            .from('attendee')
            .insert([
                { fname: totalAttendees[0].fname, lname:totalAttendees[0].lname, email:totalAttendees[0].email, password:totalAttendees[0].password },
                { fname: totalAttendees[1].fname, lname:totalAttendees[1].lname, email:totalAttendees[1].email, password:totalAttendees[1].password },
                { fname: totalAttendees[2].fname, lname:totalAttendees[2].lname, email:totalAttendees[2].email, password:totalAttendees[2].password },
                { fname: totalAttendees[3].fname, lname:totalAttendees[3].lname, email:totalAttendees[3].email, password:totalAttendees[3].password },
                { fname: totalAttendees[4].fname, lname:totalAttendees[4].lname, email:totalAttendees[4].email, password:totalAttendees[4].password },
            ]) 
            if(data) alert("Insert Successfully")      
            if(error) alert("Insert Failed")
        }    
    }
</script>



    <form on:submit|preventDefault={createAttendee}>
        <div class="w-1/2 flex mx-auto border shadow-lg">
            <div class="w-1/4 bg-[#101010] text-[#ddd] flex items-center justify-center py-3">
                <p>Select Ticket</p>
            </div>
            <div class="w-1/2 bg-[#ddd] text-[#101010] grid itmes-center justify-center py-3">
                <p>Ticker Name</p>
                <p>Description</p>
            </div>
            <div class="w-1/4 bg-[#ccc] text-[#101010] flex itmes-center justify-center py-3">
                <div class="w-full flex space-x-2 justify-center items-center">
                    <div class="">$34</div>
                    <div class="w-1/2">
                        <select
                            name="ticketNum"
                            id="ticketNum"
                            class="w-full bg-[#2a2e32] rounded-lg focus:border-[#ffc211] focus:ring-[#ffc211] text-white text-center"
                            bind:value={ticketNum} on:change="{resetAttendee}"
                        >
                            {#each num as i}
                                <option value={i}>{i}</option>
                            {/each}                            
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-1/2 mx-auto">
            <div class="w-1/6 ml-auto">
                <button on:click={openAttendee} class="w-full bg-green-300 rounded-lg py-1">Next</button>
            </div>
        </div>
        {#if openForm}
            {#each attendees as attendee, i}
                <div class="w-1/2 px-5 py-5 mx-auto mt-5 border shadow-lg">
                    <h3 class="text-xl text-green-400 mb-5">Attendee #1</h3>
                    <!-- {#if totalAttendees[0].fname}
                        <div class="grid gap-y-1 mb-3">
                            <label for="fname">First Name</label>
                            <input type="text" id="fname" class="border" bind:value={attendee.fname} required>
                        </div>
                        {attendee.errorFirst ? 'error first name' : ''}
                    {/if} -->
                    <div class="grid gap-y-1 mb-3">
                        <label for="fname">First Name</label>
                        <input type="text" id="fname" class="border" bind:value={attendee.fname} required>
                    </div>
                    <div class="grid gap-y-1 mb-3">
                        <label for="lname">Last Name</label>
                        <input type="text" id="lname" class="border" bind:value={attendee.lname}>
                    </div>
                    <div class="grid gap-y-1 mb-3">
                        <label for="email">Email</label>
                        <input type="email" id="email" class="border" bind:value={attendee.email}>
                    </div>
                    <div class="grid gap-y-1 mb-3">
                        <label for="pass">Password</label>
                        <input type="password" id="pass" class="border" bind:value={attendee.pass}>
                    </div>
                    <div class="grid gap-y-1 mb-3">
                        <p>{fillField}</p>
                    </div>
                    <div class="grid gap-y-1 mb-3">
                        <button type="button" class="w-1/3 bg-gray-400 py-1 ml-auto rounded" on:click={() => addPerson(attendee)}>Save</button>
                    </div>
                </div>
            {/each}
            <div class="w-1/2 mx-auto">
                <div class="w-1/6 ml-auto">
                    <button type="submit" class="w-full bg-green-300 rounded-lg py-1 mt-5">Submit</button>
                </div>
            </div>
        {/if}
    </form>