<template>
  <div class="container mx-auto p-4 space-y-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-primary mb-2">Component Test Page</h1>
      <p class="text-lg text-base-content/70">Testing various DaisyUI v5 components</p>
    </div>

    <!-- Buttons Section -->
    <section class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl text-primary mb-4">Buttons</h2>
        <div class="flex flex-wrap gap-2">
          <button class="btn">Default</button>
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-accent">Accent</button>
          <button class="btn btn-info">Info</button>
          <button class="btn btn-success">Success</button>
          <button class="btn btn-warning">Warning</button>
          <button class="btn btn-error">Error</button>
          <button class="btn btn-ghost">Ghost</button>
          <button class="btn btn-link">Link</button>
        </div>
        <div class="flex flex-wrap gap-2 mt-4">
          <button class="btn btn-outline">Outline</button>
          <button class="btn btn-outline btn-primary">Outline Primary</button>
          <button class="btn btn-xs">Extra Small</button>
          <button class="btn btn-sm">Small</button>
          <button class="btn btn-lg">Large</button>
          <button class="btn" disabled>Disabled</button>
          <button class="btn btn-primary loading">Loading</button>
        </div>
      </div>
    </section>

    <!-- Alerts Section -->
    <section class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl text-primary mb-4">Alerts</h2>
        <div class="space-y-4">
          <div class="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Default alert with icon</span>
          </div>
          <div class="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Info alert</span>
          </div>
          <div class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Success alert</span>
          </div>
          <div class="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L12.732 4.5c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>Warning alert</span>
          </div>
          <div class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error alert</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Elements -->
    <section class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl text-primary mb-4">Form Elements</h2>
        <form class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Text Input</span>
            </label>
            <input type="text" placeholder="Enter text" class="input input-bordered" v-model="testForm.text" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Email Input</span>
            </label>
            <input type="email" placeholder="Enter email" class="input input-bordered input-primary" v-model="testForm.email" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Textarea</span>
            </label>
            <textarea class="textarea textarea-bordered" placeholder="Enter text" v-model="testForm.textarea"></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Select</span>
            </label>
            <select class="select select-bordered" v-model="testForm.select">
              <option disabled selected>Choose an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Checkbox</span>
              <input type="checkbox" class="checkbox checkbox-primary" v-model="testForm.checkbox" />
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Toggle</span>
              <input type="checkbox" class="toggle toggle-success" v-model="testForm.toggle" />
            </label>
          </div>

          <div class="form-control">
            <div class="label">
              <span class="label-text">Radio Buttons</span>
            </div>
            <div class="flex gap-4">
              <label class="label cursor-pointer">
                <span class="label-text mr-2">Option A</span>
                <input type="radio" name="radio-test" class="radio radio-primary" value="a" v-model="testForm.radio" />
              </label>
              <label class="label cursor-pointer">
                <span class="label-text mr-2">Option B</span>
                <input type="radio" name="radio-test" class="radio radio-secondary" value="b" v-model="testForm.radio" />
              </label>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Range</span>
            </label>
            <input type="range" min="0" max="100" class="range range-accent" v-model="testForm.range" />
            <div class="w-full flex justify-between text-xs px-2">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <div class="text-sm text-center mt-2">Value: {{ testForm.range }}</div>
          </div>
        </form>
      </div>
    </section>

    <!-- Cards and Stats -->
    <div class="grid lg:grid-cols-2 gap-6">
      <section class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl text-primary mb-4">Statistics</h2>
          <div class="stats shadow">
            <div class="stat">
              <div class="stat-title">Total Users</div>
              <div class="stat-value">{{ stats.users }}</div>
              <div class="stat-desc">↗︎ 400 (22%)</div>
            </div>
            <div class="stat">
              <div class="stat-title">Downloads</div>
              <div class="stat-value text-secondary">{{ stats.downloads }}</div>
              <div class="stat-desc text-secondary">↗︎ 40 (2%)</div>
            </div>
          </div>
        </div>
      </section>

      <section class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl text-primary mb-4">Progress & Loading</h2>
          <div class="space-y-4">
            <progress class="progress" :value="progress" max="100"></progress>
            <progress class="progress progress-primary" :value="progress + 10" max="100"></progress>
            <progress class="progress progress-secondary" :value="progress + 20" max="100"></progress>
            <div class="flex justify-center space-x-4 mt-4">
              <span class="loading loading-spinner loading-xs"></span>
              <span class="loading loading-spinner loading-sm"></span>
              <span class="loading loading-spinner loading-md"></span>
              <span class="loading loading-spinner loading-lg"></span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Badges and Indicators -->
    <section class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl text-primary mb-4">Badges & Indicators</h2>
        <div class="flex flex-wrap gap-2 mb-4">
          <div class="badge">Default</div>
          <div class="badge badge-primary">Primary</div>
          <div class="badge badge-secondary">Secondary</div>
          <div class="badge badge-accent">Accent</div>
          <div class="badge badge-ghost">Ghost</div>
          <div class="badge badge-outline">Outline</div>
          <div class="badge badge-lg">Large</div>
          <div class="badge badge-sm">Small</div>
          <div class="badge badge-xs">XS</div>
        </div>
        <div class="flex gap-4">
          <div class="indicator">
            <span class="indicator-item badge badge-secondary">99+</span>
            <div class="grid w-32 h-32 bg-base-300 place-items-center">Inbox</div>
          </div>
          <div class="indicator">
            <span class="indicator-item indicator-start indicator-middle badge badge-primary">New</span>
            <div class="grid w-32 h-32 bg-base-300 place-items-center">Updates</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabs -->
    <section class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl text-primary mb-4">Tabs</h2>
        <div role="tablist" class="tabs tabs-boxed">
          <input
            type="radio"
            name="my_tabs"
            role="tab"
            class="tab"
            aria-label="Tab 1"
            :checked="activeTab === 1"
            @change="activeTab = 1"
          />
          <div role="tabpanel" class="tab-content bg-base-200 border border-base-300 rounded-box p-6 mt-4">
            <h3 class="text-lg font-semibold mb-2">Tab 1 Content</h3>
            <p>This is the content for tab 1. You can put any content here.</p>
          </div>

          <input
            type="radio"
            name="my_tabs"
            role="tab"
            class="tab"
            aria-label="Tab 2"
            :checked="activeTab === 2"
            @change="activeTab = 2"
          />
          <div role="tabpanel" class="tab-content bg-base-200 border border-base-300 rounded-box p-6 mt-4">
            <h3 class="text-lg font-semibold mb-2">Tab 2 Content</h3>
            <p>This is the content for tab 2. Different content can be shown here.</p>
          </div>

          <input
            type="radio"
            name="my_tabs"
            role="tab"
            class="tab"
            aria-label="Tab 3"
            :checked="activeTab === 3"
            @change="activeTab = 3"
          />
          <div role="tabpanel" class="tab-content bg-base-200 border border-base-300 rounded-box p-6 mt-4">
            <h3 class="text-lg font-semibold mb-2">Tab 3 Content</h3>
            <p>This is the content for tab 3. Each tab can have unique content.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Demo -->
    <section class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl text-primary mb-4">Modal</h2>
        <button class="btn btn-primary" @click="showModal = true">Open Modal</button>

        <!-- Modal -->
        <div v-if="showModal" class="modal modal-open">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">This is a modal dialog box. Press ESC key or click the button below to close.</p>
            <div class="modal-action">
              <button class="btn" @click="showModal = false">Close</button>
              <button class="btn btn-primary" @click="showModal = false">Save</button>
            </div>
          </div>
          <div class="modal-backdrop" @click="showModal = false"></div>
        </div>
      </div>
    </section>

    <!-- Form Values Display -->
    <section class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl text-primary mb-4">Current Form Values</h2>
        <div class="mockup-code">
          <pre><code>{{ JSON.stringify(testForm, null, 2) }}</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const testForm = ref({
  text: '',
  email: '',
  textarea: '',
  select: '',
  checkbox: false,
  toggle: false,
  radio: '',
  range: 50
})

const stats = ref({
  users: 1240,
  downloads: 2300
})

const progress = ref(45)
const activeTab = ref(1)
const showModal = ref(false)

let interval

onMounted(() => {
  interval = setInterval(() => {
    progress.value = (progress.value + 1) % 100
    stats.value.users += Math.floor(Math.random() * 5)
    stats.value.downloads += Math.floor(Math.random() * 10)
  }, 2000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>