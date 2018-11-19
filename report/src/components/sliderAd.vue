<template>
	<div class="sliderad" style="z-index: 90000;position:fixed ;top:50px;right:110px;width:350px;height:100px;background: #0000FE;">
		<Carousel autoplay v-model="value" loop :dots="dotsvalue">
			<CarouselItem>
					<img src="../assets/ad1.jpg" alt="" style="width:100%;height:100%">
			</CarouselItem>
			<CarouselItem>
					<img src="../assets/ad2.jpg" alt="" style="width:100%;height:100%">
			</CarouselItem>
	</Carousel>
	</div>
	
</template>

<script>
	export default {
		name:"sliderAd",
		data(){
			return{
				value:0,
				dotsvalue:'none'
			}
		}
		
	}
</script>

<style>

</style>
