<template>
  <div class="mx-auto p-4 container">
    <h1 class="mb-6 font-bold text-3xl">Todo App with daisyUI</h1>

    <!-- Add Todo Form -->
    <div class="bg-base-100 shadow-xl mb-6 card">
      <div class="card-body">
        <form @submit.prevent="addTodo" class="form-control">
          <div class="input-group">
            <input
              v-model="newTodoText"
              type="text"
              placeholder="Enter new todo..."
              class="input-bordered w-full input"
              required />
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Todo List -->
    <div class="gap-4 grid">
      <div
        v-for="todo in todos"
        :key="todo.id"
        class="bg-base-100 shadow-xl card">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <input
              v-if="editingId === todo.id"
              v-model="editingText"
              @keyup.enter="updateTodo(todo.id)"
              @blur="updateTodo(todo.id)"
              type="text"
              class="flex-1 mr-2 input-bordered input" />
            <span v-else class="flex-1 text-lg">{{ todo.text }}</span>
            <div class="space-x-2">
              <button
                @click="toggleEdit(todo.id, todo.text)"
                class="btn-outline btn btn-sm">
                {{ editingId === todo.id ? "Cancel" : "Edit" }}
              </button>
              <button @click="deleteTodo(todo.id)" class="btn btn-sm btn-error">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-if="todos.length === 0" class="mt-4 text-center">
      No todos yet. Add one above!
    </p>
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
