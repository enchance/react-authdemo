import React from "react";
import {BaseTemplate} from "../templates/BaseTemplate";


export const HomeGuestPage: React.FC = () => {
    return (
        <BaseTemplate>
            <h1>This is the title of this post</h1>
            <h2>Lorem <em>ipsum</em> dolor sit amet, consectetur adipisicing elit. Ad deleniti eius inventore magnam nostrum. Amet blanditiis commodi consectetur error explicabo harum minus nostrum officia perferendis quaerat sed, tempora vel veritatis?</h2>
            <h3>h3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam, at blanditiis deserunt, eligendi eos fugiat fugit, illum incidunt maiores molestiae nemo nisi nulla officiis perferendis quia reprehenderit tempore veniam.</h3>
            <p><strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</strong> Doloremque ducimus earum labore praesentium sint! Commodi, cupiditate debitis ea expedita, iste laudantium libero minus nemo odit reiciendis sunt tempora tenetur, totam?</p>
            <p><em>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</em> Ab accusantium aperiam error exercitationem in ipsam, iure modi natus pariatur quasi rerum temporibus unde, vitae. Debitis dicta est ex reiciendis! Neque.</p>
        </BaseTemplate>
    )
}


export const HomeUserPage: React.FC = () => {
    return (
        <BaseTemplate>
            <h1>User Landing</h1>
        </BaseTemplate>
    )
}