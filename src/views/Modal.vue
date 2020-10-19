<template id="modal">
  <div class="modal-help">
    <div class="close" @click="close">&times;</div>
    <div class="body">
      <slot name='body' />
    </div>
  </div>  
</template>

<script>
export default {
    name: "Modal",
    methods: {
      close() {
    	this.$emit('close')
      }
    }

}
</script>