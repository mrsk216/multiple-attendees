<script>
    import supabase from "$lib/db";
import { each } from "svelte/internal";


    let ticketNum = 0;
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
            let fname = totalAttendees[0].fname;      
            let lname = totalAttendees[0].lname;      
            let email = totalAttendees[0].email;      
            let password = totalAttendees[0].password;
            const { data, error } = await supabase
            .from('attendee')
            .insert([
                { fname: fname, lname:lname, email:email, password:password }
            ]) 
            if(data) alert("Insert Successfully")      
            if(error) alert("Insert Failed")
        }
        if(totalAttendees.length==2) {
            let fname0 = totalAttendees[0].fname;      
            let lname0 = totalAttendees[0].lname;      
            let email0 = totalAttendees[0].email;      
            let password0 = totalAttendees[0].password;
            let fname1 = totalAttendees[1].fname;      
            let lname1 = totalAttendees[1].lname;      
            let email1 = totalAttendees[1].email;      
            let password1 = totalAttendees[1].password;
            const { data, error } = await supabase
            .from('attendee')
            .insert([
                { fname: fname0, lname:lname0, email:email0, password:password0 },
                { fname: fname1, lname:lname1, email:email1, password:password1 }
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
                        <!-- <select
                            name="ticketNum"
                            id="ticketNum"
                            class="w-full bg-[#2a2e32] rounded-lg focus:border-[#ffc211] focus:ring-[#ffc211] text-white text-center"
                            bind:value={ticketNum} on:change="{resetAttendee}"
                        >
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                        </select> -->
                        <input type="number" class="w-full bg-[#2a2e32] rounded-lg focus:border-[#ffc211] focus:ring-[#ffc211] text-white text-center" bind:value={ticketNum} on:change="{resetAttendee}">
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
                    <div class="grid gap-y-1 mb-3">
                        <label for="fname">First Name</label>
                        <input type="text" id="fname" class="border" bind:value={attendee.fname}>
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