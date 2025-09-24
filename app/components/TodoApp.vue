<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <h1 class="text-4xl font-bold text-primary">Todo Manager</h1>
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Total Todos</div>
          <div class="stat-value text-primary">{{ todos.length }}</div>
        </div>
      </div>
    </div>

    <!-- Add Todo Form -->
    <div class="card bg-base-100 shadow-xl mb-8">
      <div class="card-body">
        <h2 class="card-title text-accent mb-4">✨ Add New Todo</h2>
        <form @submit.prevent="addTodo" class="flex gap-2">
          <input
            v-model="newTodoText"
            type="text"
            placeholder="What needs to be done?"
            class="input input-bordered input-primary flex-1"
            required
          />
          <button type="submit" class="btn btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Todo
          </button>
        </form>
      </div>
    </div>

    <!-- Todo List -->
    <div v-if="todos.length > 0" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="todo in todos"
        :key="todo.id"
        class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-200 border border-base-300"
      >
        <div class="card-body p-4">
          <div v-if="editingId === todo.id" class="space-y-3">
            <input
              v-model="editingText"
              @keyup.enter="updateTodo(todo.id)"
              @keyup.escape="cancelEdit"
              type="text"
              class="input input-bordered input-secondary w-full"
              autofocus
            />
            <div class="flex gap-2 justify-end">
              <button @click="updateTodo(todo.id)" class="btn btn-success btn-sm">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Save
              </button>
              <button @click="cancelEdit" class="btn btn-ghost btn-sm">Cancel</button>
            </div>
          </div>

          <div v-else class="flex justify-between items-start gap-3">
            <p class="flex-1 text-base-content break-words">{{ todo.text }}</p>
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost btn-xs">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </div>
              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                <li><a @click="toggleEdit(todo.id, todo.text)">✏️ Edit</a></li>
                <li><a @click="deleteTodo(todo.id)" class="text-error">🗑️ Delete</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="hero min-h-96">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-2xl font-bold mb-4">No todos yet!</h3>
          <p class="text-base-content/70 mb-6">Start by adding your first todo item above.</p>
          <div class="alert alert-info">
            <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Tip: Press Enter after typing to quickly add a todo!</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Composables and state
const todos = ref([]);
const newTodoText = ref("");
const editingId = ref(null);
const editingText = ref("");

// Fetch todos on mount
const { data: initialTodos, refresh } = await useFetch("/api/todos", {
  default: () => [],
});
todos.value = initialTodos.value || [];

const addTodo = async () => {
  if (!newTodoText.value.trim()) return;
  await $fetch("/api/todos", {
    method: "POST",
    body: { text: newTodoText.value },
  });
  newTodoText.value = "";
  await refresh();
};

const deleteTodo = async (id) => {
  await $fetch(`/api/todos/${id}`, { method: "DELETE" });
  await refresh();
};

const toggleEdit = (id, text) => {
  editingId.value = id;
  editingText.value = text;
};

const cancelEdit = () => {
  editingId.value = null;
  editingText.value = "";
};

const updateTodo = async (id) => {
  if (!editingText.value.trim()) {
    await deleteTodo(id);
    return;
  }
  await $fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: { text: editingText.value },
  });
  editingId.value = null;
  editingText.value = "";
  await refresh();
};
</script>
