// SP Map: https://upload.wikimedia.org/wikipedia/commons/5/56/Mapa_sp.svg

const spLat = -23.550520
const spLong = -46.633308
let circles;
let info;



mapboxgl.accessToken = mapBoxApi;
const map = new mapboxgl.Map({
    container: 'mapid',
    style: 'mapbox://styles/luizamorim/ckal3pq3x0mpy1ipvxf529xbx',
    center: [spLong, spLat],
    zoom: 12
});
map.addControl(new mapboxgl.NavigationControl());

const container = map.getCanvasContainer();
const svg = d3
    .select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .style("position", "absolute")
    .style("z-index", 2);

circles = d3.csv('data/lista-monumentos.csv')
    .then(function (data) {

        let dots = svg
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr('id', function (d, i) {
                return i
            })
            .attr('class', 'unselected')

            .on('mouseover', function (event, d) {
                // console.log(svg.select('circle'))
                info = d.nome + '<br />'
                info += d.data

                d3.select(this)
                    // .style('fill', 'red');
                    .attr('class', 'selected');

                d3.select('#tooltip')
                    .html(info)
                    .style('left', (event.pageX - 80) + 'px')
                    .style('top', (event.pageY - 100) + 'px')
                    .style('opacity', 0.9)

            })
            .on('mouseout', function (event, d) {
                d3.select('#tooltip')
                    .style('opacity', 0)
                d3.select(this)
                    .attr('class', 'unselected');

            })

        render()
        map.on("viewreset", render);
        map.on("move", render);
        map.on("moveend", render);

        console.log(data.length)

        function project(d) {
            return map.project(new mapboxgl.LngLat(d.long, d.lat));
        }

        function render() {
            dots
                .attr("cx", function (d) {
                    return project(d).x;
                })
                .attr("cy", function (d) {
                    return project(d).y;
                });

            }
            // console.log(dots._groups[0][0].cx.animVal.value)

        

    })