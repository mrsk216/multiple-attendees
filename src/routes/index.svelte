<script>
let ticketNum = 0;
let totalAttendees = [];
let defaultAttendee = {
		id: 1,
		fname: '',
		lname: '',
		email: '',
		pass: ''
	};

    function addPerson(attendee) {
		totalAttendees = totalAttendees.filter(m => m.id !== attendee.id);
		totalAttendees = [...totalAttendees, attendee];
	}
	const resetAttendee = () => {
		totalAttendees =[];
	}
	
	$: attendees = Array(ticketNum).fill(defaultAttendee).map((v, i) => ({...v, id: i}));
</script>



    <form action="/">
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
                        <input type="number" class="w-full bg-[#2a2e32] rounded-lg focus:border-[#ffc211] focus:ring-[#ffc211] text-white text-center" bind:value={ticketNum} on:change="{resetAttendee}">g
                    </div>
                </div>
            </div>
        </div>
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
                    <button class="w-1/3 bg-gray-400 py-1 ml-auto rounded" on:click={() => addPerson(attendee)}>Save</button>
                </div>
            </div>
        {/each}
    </form>
