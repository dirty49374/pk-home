const { spawnSync } = require('child_process');

module.exports = {
  inject(yaml) {
    const result = spawnSync(
      'istioctl',
      ['kube-inject', '-i', 'sys-istio', '-f', '-'],
      {
        input: yaml
      });
    if (result.status != 0) {
      throw new Error(`istio injection failed - ${result.output[2].toString()}`);
    }
    return result.output[1].toString();
  }
}
