# 🚀 Getting Started Guide

## ✅ Pre-Setup Verification

Before starting, ensure you have:
- [ ] Docker Desktop installed from https://www.docker.com/products/docker-desktop
- [ ] Git installed (for version control)
- [ ] This project folder cloned/opened

## 🎯 Step 1: Start Docker Desktop

**Windows/Mac:**
1. Click Docker Desktop icon in your applications menu
2. Wait for the whale icon to appear in system tray
3. Wait for "Docker is running" notification (usually 30 seconds)

**Linux:**
```bash
sudo systemctl start docker
```

## 🎯 Step 2: Run Setup Script (Easiest Method)

### Windows Users:
1. Open File Explorer
2. Navigate to your project folder
3. Double-click **`docker-setup.bat`**
4. Allow Windows to run the script (click "Run")
5. Wait for completion (~2-5 minutes first time)

### Linux/Mac Users:
```bash
chmod +x docker-setup.sh
./docker-setup.sh
```

## 🎯 Step 3: Verify Setup

After setup completes, verify everything is running:

**Check Services:**
```bash
docker-compose ps
```

You should see:
```
NAME                      STATUS
nodejs_postgres_db        running
nodejs_app               running
```

**Check Logs:**
```bash
docker-compose logs -f app
```

You should see: `Server is running on port 4001`

**Test Application:**
- Open your browser: **http://localhost:4001**
- You should see your application response

## 🎯 Step 4: Test Database Connection

**Access PostgreSQL:**
```bash
docker-compose exec db psql -U postgres -d mobilestore
```

Then:
```sql
\dt              -- List tables
\q               -- Quit
```

## 🎯 Step 5: Make Code Changes

The development environment has **hot reload** enabled:

1. Edit any file in `src/` folder
2. Save the file
3. Changes auto-reflect in running container (no rebuild needed!)
4. You'll see reload logs in `docker-compose logs -f app`

## 🎯 Step 6: Stop Services (When Done)

```bash
docker-compose down
```

To also delete database data:
```bash
docker-compose down -v
```

## 🎯 Step 7: Push to GitHub

When ready to push your code:

```bash
# Stage changes
git add .

# Commit
git commit -m "Add Docker and CI/CD setup"

# Push
git push
```

Watch CI/CD run at: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`

---

## 🌍 What's Running

After setup:

| Service | URL | Details |
|---------|-----|---------|
| Node.js App | http://localhost:4001 | Your API/Web application |
| PostgreSQL | localhost:5432 | Database (use any DB client) |

**Credentials:**
```
Database User: postgres
Database Password: root
Database Name: mobilestore
```

---

## 📁 Project Structure

```
NodeJS/
├── src/                    ← Your application code
│   ├── app.ts
│   ├── server.ts
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
│
├── Dockerfile              ← Docker image definition
├── docker-compose.yml      ← Local dev environment
├── .env                    ← Environment variables
├── .env.example            ← Template
│
├── docker-setup.bat        ← Windows setup script
├── docker-setup.sh         ← Linux/Mac setup script
│
├── ARCHITECTURE_DIAGRAM.txt ← Visual architecture
├── SETUP_COMPLETE.md       ← Completion summary
├── DOCKER_CICD_GUIDE.md    ← Full documentation
├── DOCKER_CHEATSHEET.md    ← Commands reference
└── README.md               ← Project info
```

---

## 🆘 Common Issues & Solutions

### ❌ "Docker daemon not running"
**Solution:**
- Start Docker Desktop application
- Wait for "Docker is running" notification

### ❌ "Port 4001 already in use"
**Solution:**
```bash
# Find what's using port
netstat -ano | findstr :4001  # Windows
lsof -i :4001                  # Linux/Mac

# Kill the process or use different port in docker-compose.yml
```

### ❌ "App can't connect to database"
**Solution:**
1. Check `.env` file has: `DB_HOST=db` (not localhost)
2. Verify database is running: `docker-compose logs db`
3. Check credentials in `.env`

### ❌ "Changes not reflecting in container"
**Solution:**
1. Stop services: `docker-compose down`
2. Rebuild: `docker-compose up -d --build`
3. Check volume mount: `.:/app` in docker-compose.yml

### ❌ "Can't run docker commands"
**Solution:**
- Add user to docker group (Linux):
  ```bash
  sudo usermod -aG docker $USER
  newgrp docker
  ```

---

## 🔧 Development Workflow

### Daily Development Loop

```
1. Start Docker
   ↓
2. Run: docker-compose up -d
   ↓
3. Edit code in src/ folder
   ↓
4. Changes auto-sync to container
   ↓
5. Test in browser: http://localhost:4001
   ↓
6. Repeat steps 3-5 as needed
   ↓
7. Stop: docker-compose down (when done)
```

### Git Workflow

```
1. Make changes to code
2. git add .
3. git commit -m "Description"
4. git push
5. GitHub Actions runs automatically:
   - Tests your code
   - Builds Docker image
   - Pushes to registry
```

---

## 📚 Documentation Files

After setup, explore these files:

1. **QUICK_REFERENCE.txt** - Quick commands
2. **DOCKER_SETUP_SUMMARY.txt** - Setup overview
3. **ARCHITECTURE_DIAGRAM.txt** - Visual diagrams
4. **DOCKER_CICD_GUIDE.md** - Comprehensive guide (300+ lines)
5. **DOCKER_CHEATSHEET.md** - All commands
6. **README.md** - Project documentation

---

## 🎓 Learning Resources

Understanding what's happening:

1. **Docker Concepts**
   - Image: Blueprint for containers
   - Container: Running instance of image
   - Volume: Persistent data storage
   - Network: Container communication

2. **Docker Compose**
   - Defines multiple services
   - Handles networking automatically
   - Manages volumes and environment

3. **GitHub Actions**
   - Triggered by git push
   - Runs tests automatically
   - Builds and pushes Docker image

4. **CI/CD**
   - Continuous Integration: Auto-test on every push
   - Continuous Deployment: Auto-build and deploy

---

## ✨ What You've Achieved

After following this guide:
- ✅ Docker is set up and running
- ✅ Application running in container
- ✅ Database configured and connected
- ✅ CI/CD pipeline ready
- ✅ Local development ready
- ✅ Production deployment ready

---

## 🚀 Next Steps

1. **Explore the application**
   - Open http://localhost:4001
   - Test API endpoints
   - Check database

2. **Make changes**
   - Edit code in src/
   - See changes immediately
   - Test in container

3. **Push to GitHub**
   - `git add .`
   - `git commit -m "..."`
   - `git push`
   - Watch CI/CD in Actions tab

4. **Deploy to production**
   - Docker image ready in GitHub Container Registry
   - Can deploy to AWS, Google Cloud, Azure, etc.

---

## 📞 Need Help?

1. Check: **DOCKER_CICD_GUIDE.md** (comprehensive)
2. Search: **DOCKER_CHEATSHEET.md** (commands)
3. Review: **ARCHITECTURE_DIAGRAM.txt** (visual)
4. Read: **DOCKER_SETUP_SUMMARY.txt** (FAQ)

---

## ✅ Verification Checklist

After setup, you should be able to:

- [ ] `docker-compose ps` shows 2 running services
- [ ] Browser opens http://localhost:4001 successfully
- [ ] Can see application response
- [ ] `docker-compose logs app` shows no errors
- [ ] Can connect to database at localhost:5432
- [ ] `.env` file exists with correct values
- [ ] `.github/workflows/ci-cd.yml` file exists
- [ ] Can edit code and see changes reflected
- [ ] `git log` shows your commits

---

## 🎉 Congratulations!

Your Node.js application is now:
- ✅ Containerized with Docker
- ✅ Running locally with all services
- ✅ Ready for development
- ✅ Configured for CI/CD
- ✅ Ready for production deployment

**Happy coding!** 🚀

---

**Need to restart?**
```bash
docker-compose down    # Stop all
docker-compose up -d   # Start again
```

**Need to rebuild?**
```bash
docker-compose down
docker-compose up -d --build
```

**Need help?**
- See: DOCKER_CICD_GUIDE.md (comprehensive guide)
- See: DOCKER_CHEATSHEET.md (all commands)
