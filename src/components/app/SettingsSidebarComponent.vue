<template>
    <div class=" settings-section-left">
        <div class="menu-item">
            <router-link :to="{ name: 'ProfileSettings' }">
                My Profile
                <span class="fa fa-angle-double-right pull-right"></span>
            </router-link>
        </div>
        <div class="menu-item">
            <router-link :to="{ name: 'AccountSettings' }">
                Account Settings
                <span class="fa fa-angle-double-right pull-right"></span>
            </router-link>
        </div>
        <div class="menu-item">
            <router-link :to="{ name: 'Feedback' }">Feedback
                <span class="fa fa-angle-double-right pull-right"></span>
            </router-link>
        </div>
    </div>
</template>