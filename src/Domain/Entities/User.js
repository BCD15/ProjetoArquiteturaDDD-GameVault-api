class User {
    constructor({ id, username, email, fullName, bio, profilePicture, followersCount, followingCount, gamesCount, isAdmin }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.bio = bio;
        this.profilePicture = profilePicture || 'default-profile.png';
        this.followersCount = followersCount || 0;
        this.followingCount = followingCount || 0;
        this.gamesCount = gamesCount || 0;
        this.isAdmin = isAdmin || false;
    }
}

module.exports = User;
