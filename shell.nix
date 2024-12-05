{ pkgs ? import <nixpkgs> {} }:

let
  nodejs = pkgs.nodejs_20;
in pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    nodePackages.npm
    # nodePackages.yarn
    nodePackages.typescript
    nodePackages.typescript-language-server
  ];

  shellHook = ''
    # Disable Next.js telemetry
    export NEXT_TELEMETRY_DISABLED=1

    echo "Node.js $(node --version)"
    echo "npm $(npm --version)"
  '';
}