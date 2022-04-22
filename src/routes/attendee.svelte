<script>
import { each } from "svelte/internal";


	let totalAttendees = [];
	let num = 0;
	const defaultAttendee = {
		id: num,
		name: '',
		nameError: '',
		questions:[],
		istrue: true,
		ticketName: ''
	};

	$: attendees = [
		{
			id: 0,
			name: '',
			nameError: '',
			questions:[],
			istrue: true,
			ticketName: ''
		}
	];

	//$: attendees

	$: questions = [
		{ id: 0, question: attendees[0].questions[0], type: 1 },
		{ id: 1, question: attendees[0].questions[1], type: 1 },
		{ id: 2, question: attendees[0].questions[2], type: 1 }
	];
	console.log(totalAttendees.length);

	const addNew = () => {
		num = num + 1;
		attendees = [...attendees, { ...defaultAttendee, id: num }];
	};

	let valid = false;
	$: check = (attendee) => {
		valid = true;
		if (attendee.name.length < 1) {
			valid = false;
			attendee.nameError = 'Name is required';
			attendees = attendees;
		} else {
			attendee.nameError = '';
		}
		if (valid) {
			attendee.istrue = true;
			const index = totalAttendees.findIndex((e) => e.id === attendee.id);
			if (index === -1) {
				totalAttendees = [...totalAttendees, attendee];
				attendee.istrue = false;
				attendees = attendees;
			} else {
				totalAttendees[index] = attendee;
				attendee.istrue = false;
				attendees = attendees;
			}
		}
	};

	function remove(attendee) {
		if (attendees.length > 1) {
			attendees = attendees.filter((a) => a.id != attendee.id);
			totalAttendees = attendees;
		}
	}
	let show = false;
	$: {
		let test = attendees.every((e) => e.istrue === false);
		if (test) {
			show = true;
		} else {
			show = false;
		}
	}
</script>

<div style="width: 990px;margin:auto;">
	{#each attendees as attendee, i}
		<div>
			Attendee {i + 1}:
			{#if !attendee.istrue}
				{attendee.name}
			{/if}

			<br />
			{#if attendee.istrue}
				<label for="">
					<input
						class="bg-blue-200"
						type="radio"
						bind:group={attendee.ticketName}
						value={'ticket1'}
					/> one
				</label>
				<label for="">
					<input
						class="bg-blue-200"
						type="radio"
						bind:group={attendee.ticketName}
						value={'ticket2'}
					/> two
				</label> <br />
				<input
					type="text"
					bind:value={attendee.name}
					class="bg-transparent"
					placeholder="Enter Name"
					on:input={() => (attendee.nameError = '')}
				/>
				{attendee.nameError}
				<br />
				<input
					type="text"
					bind:value={attendee.questions[0]}
					class="bg-transparent"
					placeholder="Enter Question 1"
				/>
				<br />
				<input
					type="text"
					bind:value={attendee.questions[1]}
					class="bg-transparent"
					placeholder="Enter Question 2"
				/>
				<br />
				<input
					type="text"
					bind:value={attendee.questions[2]}
					class="bg-transparent"
					placeholder="Enter Question 3"
				/>
				<br />
				<div class="grid gap-y-3">
					{#each questions as question, i}
						<div class="flex gap-x-2">
							<div>{i+1}</div>
							{#if question.type === 1}
								<div>
									{#if question.question===undefined||question.question===""}
										Question No {i+1} ?
										{:else}
										{question.question} ?
									{/if}
									<!-- {question.question} -->
								</div>
		
								<!-- <input type="text" bind:value={answer[i].answer} class="bg-transparent" /> -->
							{/if}
							{#if question.type === 2}
								<div>{question.question}</div>
								this is a type 2
							{/if}
						</div>
					{/each}
				</div>

				<br />
				<button on:click={() => check(attendee)}> Save </button>
			{:else}
				<button on:click={() => (attendee.istrue = true)}>Edit</button>
			{/if}
			{#if attendees.length > 1}
				<button class="text-black bg-red-500 p-2" type="button" on:click={() => remove(attendee)}
					>delete</button
				>
			{/if}
		</div>
	{/each}
</div>
<div style="width: 990px;margin:auto;">
	<button on:click={addNew}>add attendee</button> <br />
	{#if show && attendees.length}
		<button>go and pay</button>
	{/if}
</div>

<div style="width: 990px;margin:auto;display: flex; margin-top: 50px">
	<div style="margin-right: 20px; flex-grow: 1">
		<h1>attendees</h1>
		<pre>{JSON.stringify(attendees, null, 2)}</pre>
	</div>
	<div style="margin-right: 20px; flex-grow: 1">
		<h1>attendees</h1>
		<pre>{JSON.stringify(totalAttendees, null, 2)}</pre>
	</div>

	<div style="margin-right: 20px; flex-grow: 1">
		<h1>attendees</h1>
		<!-- <pre>{JSON.stringify(allAnswers, null, 2)}</pre> -->
	</div>
</div>


<style>
	input,button{
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 5px 10px;
		margin-top: 5px;
	}
</style>