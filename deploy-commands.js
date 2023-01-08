import fs from "fs";
import { Collection, REST, Routes } from "discord.js";

export default async function loadAndDeployCommands(client) {
  console.log("loading commands...");
  client.commands = new Collection();

  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  const commands = [];

  for (const file of commandFiles) {
    const command = (await import(`./commands/${file}`)).default;

    // load it into client
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    }

    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
}
