
const PriorityQueue = require('priorityqueuejs');
 
class Vertex {
    constructor(id,locationName,lng,lat,type,time) {
      this.id = id;
      this.lng =lng;
      this.lat = lat;
      this.type = type;
      this.time = time;
      this.locationName = locationName;
    }
  }

  class Edge {
    constructor(weight,type) {
      this.weight = weight;
      this.type =type;

    }
  }
class Graph{
    
constructor(){
    this.vertices = {};
    this.edges = new Map();
}

addVertex(id,locationName,lng,lat,type,time){
    this.vertices[id] = new Vertex(id,locationName,lng,lat,type,time);
    this.edges.set(id,new Map());
    
}
getVertexbyId(id){
    return this.vertices[id];
}
addAllCloseVertex(vertex){
  const neighbors = this.getNeighbors(vertex);
  for (const neighbor of neighbors) {
    let edge = this.getEdge(vertex,neighbor.vertex);
    if (edge.type != 'ride')continue;
    for(let key2 in this.vertices){
    const vertex2 = this.vertices[key2];
    if (vertex2.type != 'org' || (vertex2.id==vertex.id || vertex2.id==neighbor.vertex.id))continue;
     const dist = this.calculateDistance(neighbor.vertex,vertex2);
    const date1 = new Date(neighbor.vertex.time);
    const date2 = new Date(vertex2.time);
    const diffInMs = Math.abs(date1 - date2); 
    const diffInMinutes = diffInMs / (1000 * 60);
    if(dist<=1&&diffInMinutes<=10){
      this.addEdge(neighbor.vertex,vertex2,dist,'onfoot');
    } 
  }
  }
}

addEdge(vertex1, vertex2, weight,type) {
    const map = this.edges.get(vertex1.id);
    map.set(vertex2.id, new Edge(weight,type));
  }
getEdge(vertex1, vertex2){
  return this.edges.get(vertex1.id).get(vertex2.id);

}

  getNeighbors(vertex) {
    const neighborEdges = this.edges.get(vertex.id);
    const neighbors = [];
    for (const [neighborId, edge] of neighborEdges.entries()) {
      neighbors.push({vertex: this.vertices[neighborId], edge: edge});
    }
    return neighbors;
  }

   print_graph(){
    for (const key in this.vertices){
      console.log(this.vertices[key],this.edges.get(key));
    }
   }
   dijkstra(start, end, k,time,numSeats) {
    let first = false;
    let paths = []
    let edge_to_remove = this.preDijkstra(start,end,time,numSeats);
    const distance = {};
    const distpath = {};
    const visited = {};
    const path = {};
    this.print_graph();
    const pq = new PriorityQueue((a, b) => a.distance - b.distance);
  
    for (const vertexId in this.vertices) {
      distance[vertexId] = Infinity;

    }
    distance[start.id] = 0;
    distpath[start.id] = 0;
  
    pq.enq({ vertex: start, distance: 0,distancepath:0 });
  
    while (!pq.isEmpty()) {
      
      const { vertex, distance: distToVertex, distancepath:pathLenght } = pq.deq();
      console.log(vertex.type,vertex.locationName,vertex.id,distance[end.id])
      // console.log(vertex);
      if (visited[vertex.id]) continue;
      visited[vertex.id] = true;
      if (vertex == end && pathLenght <= k) {
        
        // console.log(path)
        // console.log(path[end.id])
        const resultPath =  this.buildPath(path, start, end);
        paths.push(resultPath)
        console.log("herherer")
        distance[end.id] = Infinity
        // console.log(resultPath)
        for (const vertex in resultPath) {
          // visited[vertex.id] = false;
          // console.log(resultPath[vertex].vertex.id,'dsadsadas')
          distance[resultPath[vertex].vertex.id] = Infinity;
          visited[resultPath[vertex].vertex.id] = false;
        }
      }
  
      for (const { vertex: neighbor, edge } of this.getNeighbors(vertex)) {
        // console.log(neighbor)
        const distToNeighbor = distToVertex + edge.weight;
        // if (neighbor.type=='org' && neighbor.freeSeats<numSeats)continue;
        if (distToNeighbor < distance[neighbor.id] && (pathLenght<k || (pathLenght==k && neighbor==end)) )  {
          distance[neighbor.id] = distToNeighbor;
          distpath[neighbor.id] =  pathLenght+1;
          const neighborLenght = distpath[neighbor.id]
          path[neighbor.id] = { vertex, edge };
          pq.enq({ vertex: neighbor, distance: distToNeighbor,distancepath: neighborLenght });
        }
      }
    }
    this.postDijkstra(start,end,edge_to_remove);
    return paths;
  }
  
   buildPath(path, start, end) {
    const result = [];
    let curr = end;
    // console.log(curr.id)
    // console.log(end.id)
    // console.log(path[end.id])
    while (curr !== start) {
      
      const { vertex, edge } = path[curr.id];
      result.unshift({ vertex, edge });
      curr = vertex;
    }
  
    result.push({vertex: end})
    // console.log(result)
    return result;
  }
  preDijkstra(start,end,time,numSeats){
    let vertex_to_remove = []
    const startdate = new Date(start.time);
    const enddate = new Date(end.time);
    for (let key in this.vertices){   
      if (key == start.id || key==end.id)continue;
      const vertex = this.vertices[key];
      const vertexdate = new Date(vertex.time);
      const diffInMs = Math.abs(startdate - vertexdate); // difference in milliseconds
      const diffInMinutes = diffInMs / (1000 * 60); // difference in minutes
      const distorg = this.calculateDistance(start,vertex);
      
      if (vertex.type=='org' && distorg<=1 && diffInMinutes<10 ){
        // console.log(vertex.freeSeats,numSeats,"herer")
        if(vertex.freeSeats>=numSeats){
       
        this.addEdge(start,vertex,distorg,'onfoot');
        }
      }
      const distdest = this.calculateDistance(vertex,end);
      const diffInMsend = Math.abs(enddate - vertexdate); // difference in milliseconds
      const diffInMinutesend = diffInMsend / (1000 * 60); // difference in minutes
      
      //dont include the date diff in end vertex;
      if (vertex.type=='dest' && distdest<=1){
        // console.log(vertex)
        // console.log("dsad\n")
        this.addEdge(vertex,end,distdest,'onfoot');
        
        vertex_to_remove.push(vertex);
      }
    }
    return vertex_to_remove;
  }
  postDijkstra(start,end,edge_to_remove){
    for(let i =0; i<edge_to_remove.length;i++){
      const innerMap = this.edges.get(edge_to_remove[i].id);
      innerMap.delete(end.id);
    }
    const innerMap = this.edges.get(start.id);
    for (const  { vertex: neighbor,edge} of this.getNeighbors(start)){
        innerMap.delete(neighbor.id);
    }
    delete this.vertices[start.id];
    delete this.vertices[end.id];
  }

  calculateDistance(vertex1,vertex2) {   
    const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);
      };
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(vertex2.lat - vertex1.lat);
    const dLon = toRadians(vertex2.lng - vertex1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(vertex1.lat)) *
        Math.cos(toRadians(vertex2.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}
}
module.exports = Graph;