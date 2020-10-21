<template>
    <div
        ref="cicon"
        v-html="require(`!!html-loader!./../assets/img/${iconName}.svg`)"
        :style="svgSize"
        class="svg-graphic"
        aria-hidden="true"
    />
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SvgGraphic extends Vue {
    @Prop(String) private iconName!: string;

    @Prop(String) private width!: string;

    @Prop(String) private height!: string;

    @Prop(String) private className!: string;

    /* Note: Manually annotate $refs with expected type */
    public $refs!: {
      'cicon': HTMLElement;
    }

    private get svgSize(): string {
      return `width:${this.width}px;height:${this.height}px`;
    }

    private setSvg(): void {
      const element: HTMLElement | null = this.$refs.cicon;
      const elementSvg: SVGSVGElement | null = element.querySelector('svg');
      if (elementSvg !== null) {
        elementSvg.removeAttribute('height');
        elementSvg.removeAttribute('width');
        elementSvg.setAttribute('class', this.className);
      }
    }

    private mounted(): void {
      this.setSvg();
    }
}
</script>
