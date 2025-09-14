<template>
  <div id="notes-app-container" class="mx-auto p-6 max-w-6xl container">
    <h1 id="notes-app-title" class="mb-8 font-bold text-primary text-4xl text-center">
      Notes App
    </h1>

    <!-- Add Note Form -->
    <div id="add-note-form" class="bg-base-100 shadow-2xl mb-8 rounded-xl card">
      <div class="p-6 card-body">
        <form @submit.prevent="addNote" class="form-control space-y-4">
          <input
            id="new-note-title"
            v-model="newNoteTitle"
            type="text"
            placeholder="Note title..."
            class="input input-bordered input-lg"
            required />
          <textarea
            id="new-note-content"
            v-model="newNoteContent"
            placeholder="Write your note here..."
            class="textarea textarea-bordered h-32"
            required></textarea>
          <button id="add-note-button" type="submit" class="btn btn-primary btn-lg">
            <span>Add Note</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Notes List -->
    <div id="notes-list" class="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="note in notes"
        :key="note.id"
        :id="`note-item-${note.id}`"
        class="bg-base-100 hover:shadow-2xl rounded-xl transition-shadow duration-300 card">
        <div class="p-6 card-body">
          <div v-if="editingId === note.id" class="space-y-4">
            <input
              v-model="editingTitle"
              type="text"
              class="input input-bordered w-full"
              autofocus />
            <textarea
              v-model="editingContent"
              class="textarea textarea-bordered w-full h-32"></textarea>
            <div class="flex gap-2">
              <button @click="updateNote(note.id)" class="btn btn-primary btn-sm">
                Save
              </button>
              <button @click="cancelEdit()" class="btn btn-outline btn-sm">
                Cancel
              </button>
            </div>
          </div>

          <div v-else>
            <h2 class="card-title mb-4">{{ note.title }}</h2>
            <p class="text-base-content/80 whitespace-pre-wrap mb-4">{{ note.content }}</p>
            <div class="text-xs text-base-content/60 mb-4">
              <p>Created: {{ formatDate(note.createdAt) }}</p>
              <p v-if="note.updatedAt !== note.createdAt">
                Updated: {{ formatDate(note.updatedAt) }}
              </p>
            </div>
            <div class="flex gap-2">
              <button
                @click="toggleEdit(note.id, note.title, note.content)"
                class="btn btn-outline btn-sm">
                Edit
              </button>
              <button @click="deleteNote(note.id)" class="btn btn-sm btn-error">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-if="notes.length === 0" id="empty-notes-message" class="mt-8 text-base-content/60 text-center">
      No notes yet. Add one above to get started!
    </p>
  </div>
</template>

<script setup>
// Composables and state
const notes = ref([]);
const newNoteTitle = ref("");
const newNoteContent = ref("");
const editingId = ref(null);
const editingTitle = ref("");
const editingContent = ref("");

// Fetch notes on mount
const { data: initialNotes, refresh } = await useFetch("/api/notes", {
  default: () => [],
});
notes.value = initialNotes.value || [];

const addNote = async () => {
  if (!newNoteTitle.value.trim() || !newNoteContent.value.trim()) return;
  await $fetch("/api/notes", {
    method: "POST",
    body: {
      title: newNoteTitle.value,
      content: newNoteContent.value
    },
  });
  newNoteTitle.value = "";
  newNoteContent.value = "";
  await refresh();
};

const deleteNote = async (id) => {
  await $fetch(`/api/notes/${id}`, { method: "DELETE" });
  await refresh();
};

const toggleEdit = (id, title, content) => {
  editingId.value = id;
  editingTitle.value = title;
  editingContent.value = content;
};

const cancelEdit = () => {
  editingId.value = null;
  editingTitle.value = "";
  editingContent.value = "";
};

const updateNote = async (id) => {
  if (!editingTitle.value.trim() || !editingContent.value.trim()) {
    return;
  }
  await $fetch(`/api/notes/${id}`, {
    method: "PUT",
    body: {
      title: editingTitle.value,
      content: editingContent.value
    },
  });
  editingId.value = null;
  editingTitle.value = "";
  editingContent.value = "";
  await refresh();
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};
</script>