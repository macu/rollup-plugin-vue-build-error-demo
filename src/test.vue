<template>
	<p class="test"><em>{{ greeting }} Yall!</em></p>
</template>

<script>
export default {
	data() {
		return {
			greeting: "Hello",
		};
	},
};
</script>

<style lang="scss" module>
.test {
	background-color: yellow;
	em {
		color: blue;
	}
}
</style>
