export default class Tabulator {
    static customTickCrossFormatter() {
        return {
            allowEmpty: false,
            allowTruthy: true,
            tickElement: '<span class="icon-b2w-checkbox-checked"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>',
            crossElement: "<span class='icon-b2w-checkbox'></span>",
        };
    }

    static customTickCrossFormatterOverride() {
        return {
            allowEmpty: false,
            allowTruthy: true,
            tickElement: '<span class="icon-b2w-check"></span>',
            crossElement: '<span></span>',
        };
    }
}
