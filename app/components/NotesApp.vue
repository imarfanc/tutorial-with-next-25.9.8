<template>
  <div id="notes-app-container" class="mx-auto p-6 max-w-6xl container">
    <div id="notes-header" class="flex justify-between items-center mb-8">
      <h1 id="notes-app-title" class="font-bold text-primary text-4xl">Notes App</h1>
      <div id="view-mode-toggle" class="flex gap-2">
        <button
          @click="viewMode = 'view'"
          :class="['btn', 'btn-sm', viewMode === 'view' ? 'btn-primary' : 'btn-outline']"
        >
          👁️ View
        </button>
        <button
          @click="viewMode = 'edit'"
          :class="['btn', 'btn-sm', viewMode === 'edit' ? 'btn-secondary' : 'btn-outline']"
        >
          ✏️ Edit
        </button>
      </div>
    </div>

    <!-- Add Note Form -->
    <div
      v-if="viewMode === 'edit'"
      id="add-note-form"
      class="bg-base-100 border border-base-300 shadow-lg mb-8 rounded-xl card"
    >
      <div class="p-6 card-body">
        <h2 class="card-title text-accent mb-4">Add New Note</h2>
        <form @submit.prevent="addNote" class="form-control space-y-4">
          <input
            id="new-note-title"
            v-model="newNoteTitle"
            type="text"
            placeholder="Note title..."
            class="input input-bordered input-primary"
            required
          />
          <textarea
            id="new-note-content"
            v-model="newNoteContent"
            placeholder="Write your note here..."
            class="textarea textarea-bordered textarea-primary h-32"
            required
          ></textarea>
          <button id="add-note-button" type="submit" class="btn btn-primary">
            <span>➕ Add Note</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Notes List -->
    <div id="notes-list" class="gap-6 grid md:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="note in notes"
        :key="note.id"
        :id="`note-item-${note.id}`"
        class="bg-base-100 border border-base-300 hover:border-primary hover:shadow-xl rounded-xl transition-all duration-300 card h-fit"
      >
        <!-- Edit Mode -->
        <div v-if="viewMode === 'edit' && editingId === note.id" class="p-6 card-body">
          <div class="space-y-4">
            <input
              v-model="editingTitle"
              type="text"
              class="input input-bordered input-secondary w-full"
              placeholder="Note title..."
              autofocus
            />
            <textarea
              v-model="editingContent"
              class="textarea textarea-bordered textarea-secondary w-full h-40"
              placeholder="Note content..."
            ></textarea>
            <div class="flex gap-2 justify-end">
              <button @click="updateNote(note.id)" class="btn btn-success btn-sm">💾 Save</button>
              <button @click="cancelEdit()" class="btn btn-ghost btn-sm">❌ Cancel</button>
            </div>
          </div>
        </div>

        <!-- View/Edit Mode Display -->
        <div v-else class="p-6 card-body">
          <div class="flex justify-between items-start mb-4">
            <h2 class="card-title text-secondary flex-1 break-words">{{ note.title }}</h2>
            <div v-if="viewMode === 'edit'" class="flex gap-1 flex-shrink-0 ml-2">
              <button
                @click="toggleEdit(note.id, note.title, note.content)"
                class="btn btn-outline btn-xs"
                title="Edit note"
              >
                ✏️
              </button>
              <button @click="deleteNote(note.id)" class="btn btn-error btn-xs" title="Delete note">🗑️</button>
            </div>
          </div>

          <div class="flex-1">
            <p class="text-base-content/80 whitespace-pre-wrap mb-4 leading-relaxed">{{ note.content }}</p>
          </div>

          <div class="text-xs text-base-content/60 border-t border-base-300 pt-4 mt-4">
            <p class="flex items-center gap-1">
              <span class="text-info">📅</span>
              Created: {{ formatDate(note.createdAt) }}
            </p>
            <p v-if="note.updatedAt !== note.createdAt" class="flex items-center gap-1 mt-1">
              <span class="text-warning">✏️</span>
              Updated: {{ formatDate(note.updatedAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="notes.length === 0" id="empty-notes-message" class="text-center mt-12">
      <div class="bg-base-100 border border-base-300 rounded-xl p-8 max-w-md mx-auto">
        <div class="text-4xl mb-4">📝</div>
        <p class="text-base-content/60 text-lg">No notes yet</p>
        <p class="text-base-content/40 text-sm mt-2">
          {{ viewMode === "edit" ? "Add one above to get started!" : "Switch to edit mode to add notes" }}
        </p>
      </div>
    </div>
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
const viewMode = ref("view"); // 'view' or 'edit'

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
      content: newNoteContent.value,
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
      content: editingContent.value,
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
