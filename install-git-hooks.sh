cd .git/hooks
if [ ! -f pre-commit ]; then
    cat << 'EOF' > pre-commit
#!/bin/sh

# Ensure .pages.yml matches the preview or production branch version
case $(git branch --show-current) in
  preview)
    diff -q .pages.preview.yml .pages.yml
    ;;
  main | master)
    diff -q .pages.production.yml .pages.yml
    ;;
esac

# Format and check linting
npm run format
npm run lint
# TODO:
# npx sv check

EOF
chmod +x pre-commit
fi
