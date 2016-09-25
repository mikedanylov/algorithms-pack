/*

Description:

In this task you have to code process planner.

You will be given initial thing, target thing and a set of processes to turn one thing into another (in the form of [process_name, start_thing, end_thing]). You must return names of shortest sequence of processes to turn initial thing into target thing, or empty sequence if it's impossible.

If start already equals end, return [], since no path is required.

Example:

var test_processes = [
    ['gather', 'field', 'wheat'],
    ['bake', 'flour', 'bread'],
    ['mill', 'wheat', 'flour']
];

processes('field', 'bread', test_processes); // should return ['gather', 'mill', 'bake']
processes('field', 'ferrari', test_processes); // should return []
processes('field', 'field', test_processes); // should return [], since no processes are needed

 */

function children_of(node, graph) {
  var edges = [], children = [], i;
  for (i = 0; i < graph.length; i++) {
    if (graph[i][1] === node) {
      edges.push(graph[i]);
    }
  }
  for (i = 0; i < edges.length; i++) {
    children.push(edges[i][2]);
  }
  return children;
}

function get_edges(node, graph) {
  var edges = [], i;
  for (i = 0; i < graph.length; i++) {
    if (graph[i][1] === node) {
      edges.push(graph[i]);
    }
  }
  return edges;
}

function processes(start, end, graph) {
  var path = [], queue = [],
      i;

  queue.push([start]);
  while (queue.length != 0) {
    var tmp_path = queue.shift();
    // console.log('tmp_path: ');
    // console.log(tmp_path);

    var last_node = tmp_path[tmp_path.length - 1];
    // console.log('last_node: ');
    // console.log(last_node);

    // console.log('Current dequeued path: ');
    // console.log(tmp_path);

    if (last_node === end) {
      // find weight of edges
      for (i = 0; i < tmp_path.length - 1; i++) {
        var edges = get_edges(tmp_path[i], graph);
        // console.log('Edges: ');
        // console.log(edges);
        for (var j = 0; j < edges.length; j++) {
          // console.log('Edges[j]: ');
          // console.log(edges[j]);
          if (edges[j][2] == tmp_path[i + 1]) {
            path.push(edges[j][0]);
          }
        }
      }
      // console.log(path);
      return path;
      // return tmp_path;
    }

    var last_node_children = children_of(last_node, graph);
    // console.log('last_node_children: ');
    // console.log(last_node_children);
    for (i = 0; i < last_node_children.length; i++) {
      if (tmp_path.indexOf(last_node_children[i]) == -1) {
        var new_path = tmp_path.concat([last_node_children[i]]);
        
        // console.log('new_path: ');
        // console.log(new_path);
        
        queue.push(new_path);
        // console.log('queue: ');
        // console.log(queue);
      }
    }
  }
  return null;
}

var test_processes = [
    ['gather', 'field', 'wheat'],
    ['bake', 'flour', 'bread'],
    ['mill', 'wheat', 'flour']
];

console.log(
  processes('field', 'bread', test_processes)
);

var test_cyclic_processes = [
    ['collect', 'rain', 'water'],
    ['freeze', 'water', 'ice'],
    ['melt', 'ice', 'water'],
    ['boil', 'ice', 'steam'],
    ['carve', 'ice', 'ice statue']
];

console.log(
  processes('rain', 'steam', test_cyclic_processes)
);