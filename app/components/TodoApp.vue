<template>
  <div id="todo-app-container" class="mx-auto p-6 max-w-4xl container">
    <h1 id="todo-app-title" class="mb-8 font-bold text-primary text-4xl text-center">Todo App with DaisyUI</h1>

    <!-- Add Todo Form -->
    <div id="add-todo-form" class="bg-base-100 border border-base-300 shadow-lg mb-8 rounded-xl card">
      <div class="p-6 card-body">
        <h2 class="card-title text-accent mb-4">Add New Todo</h2>
        <form @submit.prevent="addTodo" class="form-control">
          <div class="input-group input-group-lg">
            <input
              id="new-todo-input"
              v-model="newTodoText"
              type="text"
              placeholder="Enter new todo..."
              class="input input-bordered input-primary w-full input-lg"
              required
            />
            <button id="add-todo-button" type="submit" class="btn btn-primary btn-lg">
              <span>➕ Add</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Todo List -->
    <div id="todo-list" class="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="todo in todos"
        :key="todo.id"
        :id="`todo-item-${todo.id}`"
        class="bg-base-100 border border-base-300 hover:border-secondary hover:shadow-xl rounded-xl transition-all duration-300 card"
      >
        <div class="p-4 card-body">
          <div class="flex justify-between items-center">
            <div class="flex-1">
              <input
                v-if="editingId === todo.id"
                v-model="editingText"
                @keyup.enter="updateTodo(todo.id)"
                @blur="updateTodo(todo.id)"
                type="text"
                class="input input-bordered input-secondary w-full"
                autofocus
              />
              <span v-else class="font-medium text-xl break-words text-secondary">{{ todo.text }}</span>
            </div>
            <div class="flex-shrink-0 space-x-2">
              <button @click="toggleEdit(todo.id, todo.text)" class="btn btn-outline btn-sm btn-info">
                {{ editingId === todo.id ? "❌ Cancel" : "✏️ Edit" }}
              </button>
              <button @click="deleteTodo(todo.id)" class="btn btn-sm btn-error">
                <span>🗑️ Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="todos.length === 0" id="empty-todos-message" class="text-center mt-12">
      <div class="bg-base-100 border border-base-300 rounded-xl p-8 max-w-md mx-auto">
        <div class="text-4xl mb-4">📝</div>
        <p class="text-base-content/60 text-lg">No todos yet</p>
        <p class="text-base-content/40 text-sm mt-2">Add one above to get started!</p>
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
  if (editingId.value === id) {
    editingId.value = null;
    editingText.value = "";
  } else {
    editingId.value = id;
    editingText.value = text;
  }
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
